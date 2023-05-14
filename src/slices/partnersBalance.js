import { createSlice } from "@reduxjs/toolkit";
import {
  getPartnersBalance,
  downloadPartnersBalance,
  getPartnersBalancePoints,
  getPartnersBalancePointsTransactions,
} from "@services/index";

const initialState = {
  partnersBalance: [],
  partnersBalancePoints: [],
  partnersBalancePointsTransactions: [],
  count: null,
  downloadedPartnersBalance: {},
  loading: true,
  error: null,
};

const partnersBalance = createSlice({
  name: "partnersBalance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPartnersBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPartnersBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.partnersBalance = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getPartnersBalance.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPartnersBalancePoints.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPartnersBalancePoints.fulfilled, (state, action) => {
      state.loading = false;
      state.partnersBalancePoints = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getPartnersBalancePoints.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPartnersBalancePointsTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getPartnersBalancePointsTransactions.fulfilled,
      (state, action) => {
        state.loading = false;
        state.partnersBalancePointsTransactions = action.payload?.payload;
        state.count = action.payload?.count;
      }
    );
    builder.addCase(getPartnersBalancePointsTransactions.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(downloadPartnersBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(downloadPartnersBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.downloadedPartnersBalance = action.payload?.payload;
    });
    builder.addCase(downloadPartnersBalance.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = partnersBalance;

export default partnersBalance;
