import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import crypto from "crypto-js";
import { key } from "@utils/axios";
import { API_URL } from "@utils/apiUrl";

export const getPushNotifications = createAsyncThunk(
  "pushNotifications/getPushNotifications",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/push_notifications/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
          sort: params?.sort ?? "",
          format: params?.format ?? "",
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getPushNotification = createAsyncThunk(
  "pushNotifications/getPushNotification",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/push_notifications/info/${params?.id}`
      );
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createPushNotification = createAsyncThunk(
  "pushNotifications/createPushNotification",
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

      const response = await fetch(
        API_URL + "/push_notifications/new",
        requestOptions
      );

      if (response.ok) {
        return response.json().then((data) => {
          toast.success("Фотографии успешно сохранились");
          values.resetForm();
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

// export const createPushNotification = createAsyncThunk(
//   "pushNotifications/createPushNotification",
//   async (values, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/push_notifications/new", values, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success("Пользователь добавлен");
//       return response.data;
//     } catch (error) {
//       // toast.error(error?.messages[0]?.error || error?.messages[0]);
//       return rejectWithValue(error.messages);
//     }
//   }
// );

export const updatePushNotification = createAsyncThunk(
  "pushNotifications/updatePushNotification",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/push_notifications/update", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Пользователь обнавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
