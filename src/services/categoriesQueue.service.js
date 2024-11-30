import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getCategoriesQueue = createAsyncThunk(
  "categoriesQueue/getCategoriesQueue",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/points/product_categories/all", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
          // searchFields: params?.search ? ["name"] : "",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getCategoryQueue = createAsyncThunk(
  "categoriesQueue/getCategoryQueue",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/points/product_categories/info/${params?.id}`
      );
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const createCategoryQueue = createAsyncThunk(
  "categoriesQueue/createCategoryQueue",
  async ({ values, resetForm }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/points/product_categories/new",
        values
      );
      toast.success("Категория продукта добавлен");
      resetForm();
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);

export const updateCategoryQueue = createAsyncThunk(
  "categoriesQueue/updateCategoryQueue",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "points/product_categories/update",
        values
      );
      toast.success("Категория продукта обнавлен");
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.messages);
    }
  }
);
