import { createSlice } from "@reduxjs/toolkit";
import {
  getKitchenType,
  getKitchenTypes,
  createKitchenType,
  updateKitchenType,
} from "@services/index";

const initialState = {
  kitchenTypes: [],
  kitchenType: {},
  count: null,
  loading: true,
  error: null,
};

const kitchenTypes = createSlice({
  name: "kitchenTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKitchenType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getKitchenType.fulfilled, (state, action) => {
      state.loading = false;
      state.kitchenType = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getKitchenType.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getKitchenTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getKitchenTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.kitchenTypes = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getKitchenTypes.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createKitchenType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createKitchenType.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createKitchenType.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateKitchenType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateKitchenType.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateKitchenType.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = kitchenTypes;

export default kitchenTypes;
