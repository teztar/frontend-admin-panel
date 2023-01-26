import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getPartners = createAsyncThunk(
  "partners/getPartners",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/partners/all", {
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

export const getPartner = createAsyncThunk(
  "partners/getPartner",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/partners/${params?.id}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createPartner = createAsyncThunk(
  "partners/createPartner",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/partners/new", values);
      toast.success("Партнёр добавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updatePartner = createAsyncThunk(
  "partners/updatePartner",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/partners", values);
      toast.success("Партнёр обнавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
