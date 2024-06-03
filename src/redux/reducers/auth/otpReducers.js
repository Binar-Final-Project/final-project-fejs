import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otpInput: "",
  email: "",
  error: null,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setOtpInput: (state, action) => {
      state.otpInput = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setOtpInput, setEmail, setError, clearError } = otpSlice.actions;

export default otpSlice.reducer;
