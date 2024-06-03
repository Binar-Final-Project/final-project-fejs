import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  isEmailValid: false,
  password: "",
  showPassword: false,
  isPasswordTouched: false,
  user: null,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
      state.isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.payload); // Update validasi email dengan regular expression
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setPasswordTouched: (state, action) => {
      state.isPasswordTouched = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setShowPassword,
  setPasswordTouched,
  setUser,
  setError,
  clearError,
} = loginSlice.actions;

export default loginSlice.reducer;
