import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/transactions/all", {
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

export const getTransaction = createAsyncThunk(
  "transactions/getTransaction",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/transactions/info/${params?.id}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);
