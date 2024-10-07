import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import crypto from "crypto-js";
import { key } from "@utils/axios";
import { API_URL } from "@utils/apiUrl";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/all`, {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
          search: params?.search ?? "",
          categoryId: params?.category ?? "",
          pointId: params?.pointId,
          searchFields: params?.search ? ["name"] : "",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

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
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getProductCategoriesByPoint = createAsyncThunk(
  "products/getProductCategoriesByPoint",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/products/categories/${params?.pointId}`
      );
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

export const getProductCategories = createAsyncThunk(
  "products/getProductCategories",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/products/categories", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 10,
        },
      });
      return response.data;
    } catch (error) {
      toast.error(JSON.stringify(error.messages[0]));

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
      toast.error(JSON.stringify(error.messages[0]));

      return rejectWithValue(error.error);
    }
  }
);

// export const createProduct = createAsyncThunk(
//   "products/createProduct",
//   async (values, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/products/new", values);
//       toast.success("Продукт добавлен");
//       return response.data;
//     } catch (error) {
//             toast.error(JSON.stringify(error.messages[0]));

//       return rejectWithValue(error?.messages);
//     }
//   }
// );

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (values, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const encryptedData = crypto.HmacSHA256(values.requestDigest, key);

      const requestHeaders = new Headers();

      requestHeaders.append("Authorization", "Bearer " + accessToken);
      requestHeaders.append("Accept", "application/json");
      requestHeaders.append("X-RequestDigest", encryptedData);

      const requestOptions = {
        method: "POST",
        headers: requestHeaders,
        body: values.payload,
        redirect: "follow",
      };

      const response = await fetch(API_URL + "/products/new", requestOptions);

      if (response.ok) {
        return response.json().then((data) => {
          toast.success("Продукт добавлен");
          values.resetForm();
          return toCamelCaseFormat(data);
        });
      }

      if (!response.ok) {
        return response.json().then((data) => {
          const errors = () =>
            data?.map((item) => {
              return Object.values(item).map((err) => {
                return toast.error(err, {
                  duration: 10000,
                });
              });
            });

          errors();
        });
      }
    } catch (error) {
      error.messages.map((message) => {
        return {
          image: toast.error(message.image[0]),
          client_id: toast.error(message.client_id[0]),
        };
      });
      return rejectWithValue(error.messages);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (values, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const encryptedData = crypto.HmacSHA256(values.requestDigest, key);

      const requestHeaders = new Headers();

      requestHeaders.append("Authorization", "Bearer " + accessToken);
      requestHeaders.append("Accept", "application/json");
      requestHeaders.append("X-RequestDigest", encryptedData);

      const requestOptions = {
        method: "PUT", // Use PUT for updates
        headers: requestHeaders,
        body: values.payload,
        redirect: "follow",
      };

      const response = await fetch(
        API_URL + "/products/update",
        requestOptions
      );

      if (response.ok) {
        return response.json().then((data) => {
          toast.success("Продукт обновлен");
          return toCamelCaseFormat(data);
        });
      }

      if (!response.ok) {
        return response.json().then((data) => {
          const errors = () =>
            data?.map((item) => {
              return Object.values(item).map((err) => {
                return toast.error(err, {
                  duration: 10000,
                });
              });
            });

          errors();
        });
      }
    } catch (error) {
      error.messages.map((message) => {
        return {
          image: toast.error(message.image[0]),
          client_id: toast.error(message.client_id[0]),
        };
      });
      return rejectWithValue(error.messages);
    }
  }
);

// export const updateProduct = createAsyncThunk(
//   "products/updateProduct",
//   async (values, { rejectWithValue }) => {
//     try {
//       const response = await axios.put("/products/update", values);
//       toast.success("Продукт обнавлен");
//       return response.data;
//     } catch (error) {
//       toast.error(JSON.stringify(error.messages[0]));

//       return rejectWithValue(error.messages);
//     }
//   }
// );
