import { createSlice } from "@reduxjs/toolkit";
import {
  getBonus,
  getBonuses,
  createBonus,
  updateBonus,
} from "@services/index";

const initialState = {
  bonuses: [],
  bonus: {},
  loading: true,
  error: null,
};

const bonuses = createSlice({
  name: "bonuses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBonuses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBonuses.fulfilled, (state, action) => {
      state.loading = false;
      state.bonuses = action.payload;
    });
    builder.addCase(getBonuses.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getBonus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBonus.fulfilled, (state, action) => {
      state.loading = false;
      state.bonus = action.payload;
    });
    builder.addCase(getBonus.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createBonus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBonus.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createBonus.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateBonus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBonus.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateBonus.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = bonuses;

export default bonuses;
