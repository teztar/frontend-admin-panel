import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getClients = createAsyncThunk(
  "clients/getClients",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/clients", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getClient = createAsyncThunk(
  "clients/getClient",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/clients/${params?.id}`);
      return response.data;
    } catch (error) {
      toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/clients", values);
      toast.success("Клиент добавлен");
      return response.data;
    } catch (error) {
      toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/clients", values);
      toast.success("Клиент обнавлен");
      return response.data;
    } catch (error) {
      toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
