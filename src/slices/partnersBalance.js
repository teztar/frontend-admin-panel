import { createSlice } from "@reduxjs/toolkit";
import { getPartnersBalance, downloadPartnersBalance } from "@services/index";

const initialState = {
  partnersBalance: [],
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
      state.partnersBalance = action.payload;
    });
    builder.addCase(getPartnersBalance.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(downloadPartnersBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(downloadPartnersBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.downloadedPartnersBalance = action.payload;
    });
    builder.addCase(downloadPartnersBalance.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = partnersBalance;

export default partnersBalance;
