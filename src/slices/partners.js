import { createSlice } from "@reduxjs/toolkit";
import { getPartners, createPartner, updatePartner } from "@services/index";

const initialState = {
  partners: [],
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
      state.partners = action.payload;
    });
    builder.addCase(getPartners.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createPartner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPartner.fulfilled, (state, action) => {
      state.loading = false;
      state.partner = action.payload;
    });
    builder.addCase(createPartner.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updatePartner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePartner.fulfilled, (state, action) => {
      state.loading = false;
      state.partner = action.payload;
    });
    builder.addCase(updatePartner.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = partners;

export default partners;
