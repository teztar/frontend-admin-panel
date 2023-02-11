import { createSlice } from "@reduxjs/toolkit";
import { getOrder, getOrders, createOrder, updateOrder } from "@services/index";

const initialState = {
  orders: [],
  count: null,
  order: {},
  loading: true,
  error: null,
};

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload?.payload;
    });
    builder.addCase(getOrder.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateOrder.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = orders;

export default orders;
