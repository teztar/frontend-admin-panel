import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPartnersBalance = createAsyncThunk(
  "partnersBalance/getPartnersBalance",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/partners_balance/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          dateFrom: params?.dateFrom || "2000-10-10",
          dateTo: params?.dateTo || "2099-10-10",
          search: params?.search || "",
          status: params?.status || "",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getPartnersBalancePoints = createAsyncThunk(
  "partnersBalance/getPartnersBalancePoints",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/partners_balance/points/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          partnerId: params?.partnerId ?? 10,
          dateFrom: params?.dateFrom || "2000-10-10",
          dateTo: params?.dateTo || "2099-10-10",
          search: params?.search || "",
          status: params?.status || "",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getPartnersBalancePointsTransactions = createAsyncThunk(
  "partnersBalance/getPartnersBalancePointsTransactions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/partners_balance/points/transactions/all",
        {
          params: {
            page: params?.page ?? 1,
            perPage: params?.perPage ?? 10,
            pointId: params?.pointId ?? 10,
            dateFrom: params?.dateFrom || "2000-10-10",
            dateTo: params?.dateTo || "2099-10-10",
            search: params?.search || "",
            status: params?.status || "",
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const updatePartnersBalancePoint = createAsyncThunk(
  "partnersBalance/updatePartnersBalancePoint",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/partners_balance/points/change/status",
        values
      );
      toast.success("Статус точки обнавлен");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);

export const downloadPartnersBalance = createAsyncThunk(
  "partnersBalance/downloadPartnersBalance",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(`/partners_balance/download/file`, {
          params: {
            status: params?.status ?? "",
            dateTo: params?.dateTo ?? "",
            dateFrom: params?.dateFrom ?? "",
          },
          responseType: "arraybuffer",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "partnersBalances.xlsx");
          document.body.appendChild(link);
          link.click();
        });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);
