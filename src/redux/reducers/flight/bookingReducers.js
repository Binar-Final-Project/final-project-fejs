import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking_code: "",
  selectedFlight: null,
  passengerDetails: [],
  error: null,
  isLoading: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingCode: (state, action) => {
      state.booking_code = action.payload;
    },
    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    setPassengerDetails: (state, action) => {
      state.passengerDetails = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setBookingCode,
  setSelectedFlight,
  setPassengerDetails,
  setError,
  clearError,
  setLoading,
} = bookingSlice.actions;

export default bookingSlice.reducer;
