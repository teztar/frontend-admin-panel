import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getPoints = createAsyncThunk(
  "points/getPoints",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/points", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          partnerId: params?.partnerId,
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getPoint = createAsyncThunk(
  "points/getPoint",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/points/${params?.id}`);
      return response.data;
    } catch (error) {
      toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createPoint = createAsyncThunk(
  "points/createPoint",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/points", values);
      toast.success("Точка добавлен");
      return response.data;
    } catch (error) {
      toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updatePoint = createAsyncThunk(
  "points/updatePoint",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/points", values);
      toast.success("Точка обнавлен");
      return response.data;
    } catch (error) {
      toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
