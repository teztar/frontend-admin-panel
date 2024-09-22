import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getKitchenTypes = createAsyncThunk(
  "kitchenTypes/getKitchenTypes",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/kitchen_types", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getKitchenType = createAsyncThunk(
  "kitchenTypes/getKitchenType",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/kitchen_types/info/${params?.id}`);
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const createKitchenType = createAsyncThunk(
  "kitchenTypes/createKitchenType",
  async ({ values, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/kitchen_types", values);
      toast.success("Тип кухни добавлен");
      resetForm();
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);

export const updateKitchenType = createAsyncThunk(
  "kitchenTypes/updateKitchenType",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/kitchen_types", values);
      toast.success("Тип кухни обнавлен");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);
