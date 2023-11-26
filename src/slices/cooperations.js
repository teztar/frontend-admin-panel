import { createSlice } from "@reduxjs/toolkit";
import {
  getCooperation,
  getCooperations,
  updateCooperation,
} from "@services/index";

const initialState = {
  cooperations: [],
  count: null,
  transaction: {},
  loading: true,
  error: null,
};

const cooperations = createSlice({
  name: "cooperations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCooperations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCooperations.fulfilled, (state, action) => {
      state.loading = false;
      state.cooperations = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getCooperations.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCooperation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCooperation.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload?.payload;
    });
    builder.addCase(getCooperation.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateCooperation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCooperation.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCooperation.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = cooperations;

export default cooperations;
