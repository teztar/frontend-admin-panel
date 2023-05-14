import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getCouriers = createAsyncThunk(
  "couriers/getCouriers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/couriers/all", {
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

export const getCourier = createAsyncThunk(
  "couriers/getCourier",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/couriers/info/${params?.id}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getCourierBalances = createAsyncThunk(
  "couriers/getCourierBalances",
  async (params, { rejectWithValue }) => {
    console.log({ params });
    try {
      const response = await axios.get("/couriers/balance", {
        params: {
          courierId: params?.id,
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createCourier = createAsyncThunk(
  "couriers/createCourier",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/couriers/new", values);
      toast.success("Курьер добавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updateCourier = createAsyncThunk(
  "couriers/updateCourier",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/couriers/update", values);
      toast.success("Курьер обнавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
