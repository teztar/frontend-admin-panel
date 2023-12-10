import { createSlice } from "@reduxjs/toolkit";
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  getProductImage,
  getProductCategoriesByPoint,
  getProductCategories,
} from "@services/index";

const initialState = {
  products: [],
  pointProductCategories: [],
  productCategories: [],
  count: null,
  product: {},
  productImage: null,
  loading: true,
  error: null,
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload?.payload;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getProductCategoriesByPoint.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductCategoriesByPoint.fulfilled, (state, action) => {
      state.loading = false;
      state.pointProductCategories = action.payload?.payload;
    });
    builder.addCase(getProductCategoriesByPoint.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getProductCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.productCategories = action.payload?.payload;
    });
    builder.addCase(getProductCategories.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getProductImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductImage.fulfilled, (state, action) => {
      state.loading = false;
      state.productImage = action.payload;
    });
    builder.addCase(getProductImage.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = products;

export default products;
