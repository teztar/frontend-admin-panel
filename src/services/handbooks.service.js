import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getApplicationTypes = createAsyncThunk(
  "handbook/getApplicationTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/application_types");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getBonusCategories = createAsyncThunk(
  "handbook/getBonusCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/bonus_categories");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getBonusTypes = createAsyncThunk(
  "handbook/getBonusTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/bonus_types");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getClientBonusOperationTypes = createAsyncThunk(
  "handbook/getClientBonusOperationTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/handbook/client_bonus_operation_types"
      );
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getClientStatuses = createAsyncThunk(
  "handbook/getClientStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/client_statuses");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getCooperationRequestStatuses = createAsyncThunk(
  "handbook/getCooperationRequestStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/handbook/cooperation_request_statuses"
      );
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getCooperationRequestTypes = createAsyncThunk(
  "handbook/getCooperationRequestTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/cooperation_request_types");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getCourierStatuses = createAsyncThunk(
  "handbook/getCourierStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/courier_statuses");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getGenders = createAsyncThunk(
  "handbook/getGenders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/genders");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getNotificationFormats = createAsyncThunk(
  "handbook/getNotificationFormats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/notification_formats");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getNotificationSortedFields = createAsyncThunk(
  "handbook/getNotificationSortedFields",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/notification_sorted_fields");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getNotificationStatuses = createAsyncThunk(
  "handbook/getNotificationStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/notification_statuses");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getOrderPaymentOptions = createAsyncThunk(
  "handbook/getOrderPaymentOptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/order_payment_options");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getOrderStatuses = createAsyncThunk(
  "handbook/getOrderStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/order_statuses");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getPartnerPointsBalanceStatuses = createAsyncThunk(
  "handbook/getPartnerPointsBalanceStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/handbook/partner_points_balance_statuses"
      );
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getPeriods = createAsyncThunk(
  "handbook/getPeriods",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/periods");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getPointStatuses = createAsyncThunk(
  "handbook/getPointStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/point_statuses");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);
export const getPrefixes = createAsyncThunk(
  "handbook/getPrefixes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/prefixes");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);
