import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getRoles = createAsyncThunk(
  "roles/getRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/roles/all");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getRole = createAsyncThunk(
  "roles/getRole",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/roles/info/${params?.id}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createRole = createAsyncThunk(
  "roles/createRole",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/roles/new", values);
      toast.success("Роль добавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/roles/update", values);
      toast.success("Роль обнавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);

export const getPermissions = createAsyncThunk(
  "roles/getPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/roles/perms/all");
      return response.data;
    } catch (error) {
      toast.error(error?.messages[0]?.name || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);
