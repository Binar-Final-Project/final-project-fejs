import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  error: null,
  isLoggedIn: false,
};

const googleSlice = createSlice({
  name: "googleLogin",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
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
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setToken, setUser, setError, clearError, setIsLoggedIn } =
  googleSlice.actions;

export default googleSlice.reducer;
