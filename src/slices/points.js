import { createSlice } from "@reduxjs/toolkit";
import { getPoint, getPoints, createPoint, updatePoint } from "@services/index";

const initialState = {
  points: [],
  point: {},
  loading: true,
  error: null,
};

const points = createSlice({
  name: "points",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPoints.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPoints.fulfilled, (state, action) => {
      state.loading = false;
      state.points = action.payload;
    });
    builder.addCase(getPoints.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPoint.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPoint.fulfilled, (state, action) => {
      state.loading = false;
      state.point = action.payload;
    });
    builder.addCase(getPoint.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createPoint.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPoint.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPoint.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updatePoint.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePoint.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePoint.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = points;

export default points;
