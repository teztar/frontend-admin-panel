import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/transactions/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
          status: params?.status ?? "",
          addedFrom: params?.addedFrom ?? "",
          paymentOption: params?.paymentOption ?? "",
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

export const downloadTransactionsFile = createAsyncThunk(
  "transactions/downloadTransactions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios
        .get("/transactions/download/file", {
          params: {
            status: params?.status ?? "",
            addedFrom: params?.addedFrom ?? "",
            paymentOption: params?.paymentOption ?? "",
          },
          responseType: "arraybuffer",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "transactions.xlsx");
          document.body.appendChild(link);
          link.click();
        });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);
