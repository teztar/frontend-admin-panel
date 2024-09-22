import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users/all", {
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

export const getUser = createAsyncThunk(
  "users/getUser",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/users/info/${params?.id}`);
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ values, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/new", values);
      toast.success("Пользователь добавлен");
      resetForm();
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/users/update", values);
      toast.success("Пользователь обнавлен");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);
