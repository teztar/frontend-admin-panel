import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCooperations = createAsyncThunk(
  "cooperation/getCooperations",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/cooperation/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
          type: params?.type ?? "",
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getCooperation = createAsyncThunk(
  "cooperation/getCooperation",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/cooperation/info/${params?.id}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);
