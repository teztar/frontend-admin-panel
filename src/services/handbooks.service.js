import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getApplicationTypes = createAsyncThunk(
  "handbooks/getApplicationTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/application_types");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getBonusCategories = createAsyncThunk(
  "handbooks/getBonusCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/bonus_categories");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getBonusTypes = createAsyncThunk(
  "handbooks/getBonusTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/bonus_types");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getClientBonusOperationTypes = createAsyncThunk(
  "handbooks/getClientBonusOperationTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/handbook/client_bonus_operation_types"
      );
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getClientStatuses = createAsyncThunk(
  "handbooks/getClientStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/client_statuses");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getCooperationRequestStatuses = createAsyncThunk(
  "handbooks/getCooperationRequestStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/handbook/cooperation_request_statuses"
      );
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getCooperationRequestTypes = createAsyncThunk(
  "handbooks/getCooperationRequestTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/cooperation_request_types");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getCourierStatuses = createAsyncThunk(
  "handbooks/getCourierStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/courier_statuses");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getGenders = createAsyncThunk(
  "handbooks/getGenders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/genders");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getNotificationFormats = createAsyncThunk(
  "handbooks/getNotificationFormats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/notification_formats");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getNotificationSortedFields = createAsyncThunk(
  "handbooks/getNotificationSortedFields",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/notification_sorted_fields");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getNotificationStatuses = createAsyncThunk(
  "handbooks/getNotificationStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/notification_statuses");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getOrderPaymentOptions = createAsyncThunk(
  "handbooks/getOrderPaymentOptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/order_payment_options");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getOrderStatuses = createAsyncThunk(
  "handbooks/getOrderStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/order_statuses");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getPartnerPointsBalanceStatuses = createAsyncThunk(
  "handbooks/getPartnerPointsBalanceStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/handbook/partner_points_balance_statuses"
      );
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getPeriods = createAsyncThunk(
  "handbooks/getPeriods",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/periods");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getPointStatuses = createAsyncThunk(
  "handbooks/getPointStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/point_statuses");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);
export const getPrefixes = createAsyncThunk(
  "handbooks/getPrefixes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/prefixes");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getProductVolumes = createAsyncThunk(
  "handbooks/getProductVolumes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/product_volumes");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getBannerReferenceTypes = createAsyncThunk(
  "banners/getBannerReferenceTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/banner_reference_types");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getBannerTypes = createAsyncThunk(
  "banners/getBannerTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/handbook/banner_types");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);
