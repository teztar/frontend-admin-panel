import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPartnersBalance = createAsyncThunk(
  "partnersBalance/getPartnersBalance",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/partners_balance/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          dateFrom: params?.dateFrom || "2000-10-10",
          dateTo: params?.dateTo || "2099-10-10",
          search: params?.search || "",
          status: params?.status || "",
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const downloadPartnersBalance = createAsyncThunk(
  "partnersBalance/downloadPartnersBalance",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/partners_balance/download/file${params}`
      );
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);
