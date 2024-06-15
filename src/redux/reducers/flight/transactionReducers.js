import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  isLoading: true,
};

const transactionSlicer = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTransactions, setIsLoading } = transactionSlicer.actions;

export default transactionSlicer.reducer;
