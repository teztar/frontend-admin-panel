import { createSlice } from "@reduxjs/toolkit";
import {
  getCourier,
  getCouriers,
  createCourier,
  updateCourier,
  getCourierBalances,
  getCourierStats,
  createPayDebtAmount,
} from "@services/index";

const initialState = {
  couriers: [],
  courierStats: [],
  courierBalances: [],
  count: null,
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
      state.couriers = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getCouriers.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCourier.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourier.fulfilled, (state, action) => {
      state.loading = false;
      state.courier = action.payload?.payload;
    });
    builder.addCase(getCourier.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCourierStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourierStats.fulfilled, (state, action) => {
      state.loading = false;
      state.courierStats = action.payload?.payload;
    });
    builder.addCase(getCourierStats.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCourierBalances.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourierBalances.fulfilled, (state, action) => {
      state.loading = false;
      state.courierBalances = action.payload?.payload;
    });
    builder.addCase(getCourierBalances.rejected, (state) => {
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

    builder.addCase(createPayDebtAmount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPayDebtAmount.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPayDebtAmount.rejected, (state) => {
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
