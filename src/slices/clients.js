import { createSlice } from "@reduxjs/toolkit";
import {
  getClient,
  getClients,
  createClient,
  updateClient,
  getClientOrders,
} from "@services/index";

const initialState = {
  clients: [],
  count: null,
  client: {},
  clientOrders: [],
  loading: true,
  error: null,
};

const clients = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getClients.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClient.fulfilled, (state, action) => {
      state.loading = false;
      state.client = action.payload?.payload;
    });
    builder.addCase(getClient.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getClientOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClientOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.clientOrders = action.payload?.payload;
      state.count = action.payload?.count;
    });
    builder.addCase(getClientOrders.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createClient.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createClient.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateClient.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateClient.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = clients;

export default clients;
