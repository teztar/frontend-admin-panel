import { createSlice } from "@reduxjs/toolkit";
import {
  getPushNotification,
  getPushNotifications,
  createPushNotification,
  updatePushNotification,
} from "@services/index";

const initialState = {
  pushNotifications: [],
  count: null,
  pushNotification: {},
  loading: true,
  error: null,
};

const pushNotifications = createSlice({
  name: "pushNotifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPushNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPushNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.pushNotifications = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getPushNotifications.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPushNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPushNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.pushNotification = action.payload?.payload;
    });
    builder.addCase(getPushNotification.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createPushNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPushNotification.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPushNotification.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updatePushNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePushNotification.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePushNotification.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = pushNotifications;

export default pushNotifications;
