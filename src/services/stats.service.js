import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStats = createAsyncThunk(
  "stats/getStats",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/stats/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);
