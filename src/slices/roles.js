import { createSlice } from "@reduxjs/toolkit";
import {
  getRole,
  getRoles,
  createRole,
  updateRole,
  getPermissions,
} from "@services/index";

const initialState = {
  roles: [],
  count: null,
  role: {},
  permissions: [],
  loading: true,
  error: null,
};

const roles = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getRoles.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRole.fulfilled, (state, action) => {
      state.loading = false;
      state.role = action.payload?.payload;
    });
    builder.addCase(getRole.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRole.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createRole.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateRole.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateRole.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPermissions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.permissions = action.payload?.payload;
    });
    builder.addCase(getPermissions.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = roles;

export default roles;
