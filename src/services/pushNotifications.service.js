import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

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
      const response = await axios.post("/push_notifications/new", values);
      toast.success("Пользователь добавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updatePushNotification = createAsyncThunk(
  "pushNotifications/updatePushNotification",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/push_notifications/update", values);
      toast.success("Пользователь обнавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
