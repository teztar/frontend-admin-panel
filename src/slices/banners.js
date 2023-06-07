import { createSlice } from "@reduxjs/toolkit";
import {
  getBanner,
  getBanners,
  createBanner,
  updateBanner,
} from "@services/index";

const initialState = {
  banners: [],
  count: null,
  banner: {},
  loading: true,
  error: null,
};

const banners = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.loading = false;
      state.banners = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getBanners.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.banner = action.payload?.payload;
    });
    builder.addCase(getBanner.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBanner.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createBanner.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBanner.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateBanner.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = banners;

export default banners;
