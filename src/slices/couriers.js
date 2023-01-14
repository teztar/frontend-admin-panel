import { createSlice } from "@reduxjs/toolkit";
import {
  getCourier,
  getCouriers,
  createCourier,
  updateCourier,
} from "@services/index";

const initialState = {
  couriers: [],
  courier: {},
  loading: true,
  error: null,
};

const couriers = createSlice({
  name: "couriers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCouriers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCouriers.fulfilled, (state, action) => {
      state.loading = false;
      state.couriers = action.payload;
    });
    builder.addCase(getCouriers.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCourier.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourier.fulfilled, (state, action) => {
      state.loading = false;
      state.courier = action.payload;
    });
    builder.addCase(getCourier.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createCourier.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCourier.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createCourier.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateCourier.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCourier.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCourier.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = couriers;

export default couriers;
