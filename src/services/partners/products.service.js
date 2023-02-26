import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/all`, {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
          pointId: params?.pointId,
        },
      });
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/products/info/${params?.pointId}/${params?.productId}`
      );
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const getProductImage = createAsyncThunk(
  "products/getProductImage",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/images/${params?.filePath}`);
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/products/new", values);
      toast.success("Продукт добавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error?.messages);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put("/products/update", values);
      toast.success("Продукт обнавлен");
      return response.data;
    } catch (error) {
      // toast.error(error?.messages[0]?.error || error?.messages[0]);
      return rejectWithValue(error.messages);
    }
  }
);
