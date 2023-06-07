import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

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

export const createBanner = createAsyncThunk(
  "banners/createBanner",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/banners/new", values);
      toast.success("Баннер добавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updateBanner = createAsyncThunk(
  "banners/updateBanner",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/banners/update", values);
      toast.success("Баннер обнавлен");
      return response.data;
    } catch (error) {
      const errArray = Object.entries(error?.messages[0]?.error);

      for (const [key, value] of errArray) {
        toast.error(`${key}: ${value}`);
      }
      console.log(Object.entries(error.messages[0].error));
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
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
