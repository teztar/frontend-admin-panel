import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import crypto from "crypto-js";
import axios from "axios";
import { key } from "@utils/axios";
import { API_URL } from "@utils/apiUrl";

export const getPoints = createAsyncThunk(
  "points/getPoints",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/points/all`, {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          partnerId: params?.partnerId,
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getPoint = createAsyncThunk(
  "points/getPoint",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/points/info/${params?.partnerId}/${params?.pointId}`
      );
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getPointImage = createAsyncThunk(
  "points/getPointImage",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/points/images/${params?.filePath}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createPoint = createAsyncThunk(
  "points/createPoint",
  async (values, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const encryptedData = crypto.HmacSHA256(values.requestDigest, key);

      const requestHeaders = new Headers();

      requestHeaders.append("Authorization", "Bearer " + accessToken);
      requestHeaders.append("Accept", "application/json");
      requestHeaders.append("X-RequestDigest", encryptedData);

      const requestOptions = {
        method: "POST",
        headers: requestHeaders,
        body: values.payload,
        redirect: "follow",
      };

      const response = await fetch(API_URL + "/points/new", requestOptions);

      if (response.ok) {
        return response.json().then((data) => {
          toast.success("Точка добавлен");
          return toCamelCaseFormat(data);
        });
      }

      if (!response.ok) {
        return response.json().then((data) => {
          const errors = () =>
            data?.map((item) => {
              return Object.values(item).map((err) => {
                return toast.error(err, {
                  duration: 10000,
                });
              });
            });

          errors();
        });
      }
    } catch (error) {
      error.messages.map((message) => {
        return {
          image: toast.error(message.image[0]),
          client_id: toast.error(message.client_id[0]),
        };
      });
      return rejectWithValue(error.messages);
    }
  }
);

export const updatePoint = createAsyncThunk(
  "points/updatePoint",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/points/update", values);
      toast.success("Точка обнавлен");
      return response.data;
    } catch (error) {
      const errArray = Object.entries(error?.messages[0]?.error);

      for (const [key, value] of errArray) {
        toast.error(`${key}: ${value}`);
      }
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

// export const updatePoint1 = createAsyncThunk(
//   "points/updatePoint",
//   async (values, { rejectWithValue }) => {
//     try {
//       const response = await axios.put("/points/update", values);
//       toast.success("Точка обнавлен");
//       return response.data;
//     } catch (error) {
//       // toast.error(error?.messages[0]?.error || error?.messages[0]);
//       return rejectWithValue(error.messages);
//     }
//   }
// );
