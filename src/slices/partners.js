import { createSlice } from "@reduxjs/toolkit";
import {
  getPartner,
  getPartners,
  createPartner,
  updatePartner,
} from "@services/index";

const initialState = {
  partners: [],
  count: null,
  partner: {},
  loading: true,
  error: null,
};

const partners = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPartners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPartners.fulfilled, (state, action) => {
      state.loading = false;
      state.partners = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getPartners.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPartner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPartner.fulfilled, (state, action) => {
      state.loading = false;
      state.partner = action.payload?.payload;
    });
    builder.addCase(getPartner.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createPartner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPartner.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPartner.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updatePartner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePartner.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePartner.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = partners;

export default partners;
