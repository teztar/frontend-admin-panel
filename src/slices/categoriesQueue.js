import { createSlice } from "@reduxjs/toolkit";
import {
  getCategoryQueue,
  getCategoriesQueue,
  createCategoryQueue,
  updateCategoryQueue,
} from "@services/index";

const initialState = {
  categoriesQueue: [],
  categoryQueue: {},
  count: null,
  loading: true,
  error: null,
};

const categoriesQueue = createSlice({
  name: "categoriesQueue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryQueue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryQueue.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryQueue = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getCategoryQueue.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCategoriesQueue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoriesQueue.fulfilled, (state, action) => {
      state.loading = false;
      state.categoriesQueue = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getCategoriesQueue.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createCategoryQueue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryQueue.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createCategoryQueue.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateCategoryQueue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategoryQueue.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCategoryQueue.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = categoriesQueue;

export default categoriesQueue;
