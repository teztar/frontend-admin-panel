import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStats = createAsyncThunk(
  "stats/getStats",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/stats/all", {
        params: {
          period: params?.period ?? "TODAY",
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);
