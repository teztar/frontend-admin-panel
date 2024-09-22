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
      toast.error(JSON.stringify(error.messages[0]));

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
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getCourierStats = createAsyncThunk(
  "couriers/getCourierStats",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/couriers/stats", {
        params: {
          courierId: params?.id,
          period: params?.period,
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getCourierBalances = createAsyncThunk(
  "couriers/getCourierBalances",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/couriers/balance", {
        params: {
          courierId: params?.id,
          period: params?.period ?? "YEAR",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const createCourier = createAsyncThunk(
  "couriers/createCourier",
  async ({ values, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/couriers/new", values);
      toast.success("Курьер добавлен");
      resetForm();
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);

export const createPayDebtAmount = createAsyncThunk(
  "couriers/createPayDebtAmount",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/couriers/balance/pay_debt_amount",
        values
      );
      toast.success("Pay debt amount success");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

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
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);
