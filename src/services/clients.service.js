import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getClients = createAsyncThunk(
  "clients/getClients",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/clients/all", {
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

export const getClient = createAsyncThunk(
  "clients/getClient",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/clients/info/${params?.id}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getClientOrders = createAsyncThunk(
  "clients/getClientOrders",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/clients/orders/${params.id}`, {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
          status: params?.status ?? "",
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createClient = createAsyncThunk(
  "clients/createClient",
  async ({ values, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/clients/new", values);
      toast.success("Клиент добавлен");
      resetForm();
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/clients/update", values);
      toast.success("Клиент обнавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updateClientStatus = createAsyncThunk(
  "clients/updateClientStatus",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/clients/change/status", values);
      toast.success("Статус клеинта обнавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
