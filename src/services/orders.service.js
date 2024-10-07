import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/orders/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
          status: params?.status ?? "",
          searchFields: params?.search ? ["id"] : "",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/orders/info/${params?.id}`);
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ values, setValues }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/orders/new", values);
      toast.success("Заказ добавлен");
      setValues({});
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/orders/change/status", values);
      toast.success("Статус заказа обнавлен");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);
