import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import crypto from "crypto-js";
import { key } from "@utils/axios";
import { API_URL } from "@utils/apiUrl";

export const getBanners = createAsyncThunk(
  "banners/getBanners",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/banners/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getBanner = createAsyncThunk(
  "banners/getBanner",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/banners/info/${params?.id}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

// export const getBannerImage = createAsyncThunk(
//   "banners/getBannerImage",
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/banners/images/${params?.filePath}`);
//       return response.data;
//     } catch (error) {
//       // toast.error(error?.messages[0]?.error || error?.messages[0]);
//       return rejectWithValue(error.error);
//     }
//   }
// );

export const getBannerImage = createAsyncThunk(
  "banners/getBannerImage",
  async (params, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const requestHeaders = new Headers();

      requestHeaders.append("Authorization", "Bearer " + accessToken);
      requestHeaders.append("Accept", "application/json");
      requestHeaders.append("X-RequestDigest", encryptedData);

      const requestOptions = {
        method: "GET",
        headers: requestHeaders,
      };

      const response = await fetch(API_URL + "/banners/new", requestOptions);

      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createBanner = createAsyncThunk(
  "banners/createBanner",
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

      const response = await fetch(API_URL + "/banners/new", requestOptions);

      if (response.ok) {
        return response.json().then((data) => {
          toast.success("Banner успешно сохранились");
          // history.push("/dashboard/banners");
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

export const updateBanner = createAsyncThunk(
  "banners/updateBanner",
  async (values, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const encryptedData = crypto.HmacSHA256(values.requestDigest, key);

      const requestHeaders = new Headers();

      requestHeaders.append("Authorization", "Bearer " + accessToken);
      requestHeaders.append("Accept", "application/json");
      requestHeaders.append("X-RequestDigest", encryptedData);

      const requestOptions = {
        method: "PUT",
        headers: requestHeaders,
        body: values.payload,
        redirect: "follow",
      };

      const response = await fetch(API_URL + "/banners/update", requestOptions);

      if (response.ok) {
        return response.json().then((data) => {
          toast.success("Banner успешно обновлен");
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

export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/banners/delete/${params?.id}`);
      toast.success("Баннер удален");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
