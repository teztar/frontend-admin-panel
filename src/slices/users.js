import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  getPermissions,
} from "@services/index";

const initialState = {
  users: [],
  user: {},
  permissions: [],
  loading: true,
  error: null,
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPermissions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.permissions = action.payload;
    });
    builder.addCase(getPermissions.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = users;

export default users;
