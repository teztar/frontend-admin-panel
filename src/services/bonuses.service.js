import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getBonuses = createAsyncThunk(
  "bonuses/getBonuses",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/bonuses/all", params);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getBonus = createAsyncThunk(
  "bonuses/getBonus",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/bonuses/${params?.id}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createBonus = createAsyncThunk(
  "bonuses/createBonus",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/bonuses/new", values);
      toast.success("Бонус добавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updateBonus = createAsyncThunk(
  "bonuses/updateBonus",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/bonuses", values);
      toast.success("Бонус обнавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
