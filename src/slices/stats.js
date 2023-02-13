import { createSlice } from "@reduxjs/toolkit";
import { getStats } from "@services/index";

const initialState = {
  stats: [],
  loading: true,
  error: null,
};

const stats = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload?.payload;
    });
    builder.addCase(getStats.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = stats;

export default stats;
