import { createSlice } from "@reduxjs/toolkit";
import { getTransaction, getTransactions } from "@services/index";

const initialState = {
  transactions: [],
  transaction: {},
  loading: true,
  error: null,
};

const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(getTransactions.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    });
    builder.addCase(getTransaction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = transactions;

export default transactions;
