import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking_code: "",
  payment_method: "",
  card_number: "",
  card_holder_name: "",
  cvv: "",
  expiry_date: "",
  selectedMonth: "",
  selectedYear: "",
  selectedMethod: "",
  isDropdownOpen: false,
  error: null,
  isLoading: false,
  paymentSuccess: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setBookingCode: (state, action) => {
      state.booking_code = action.payload;
    },
    setCardNumber: (state, action) => {
      state.card_number = action.payload;
    },
    setCardHolderName: (state, action) => {
      state.card_holder_name = action.payload;
    },
    setCvv: (state, action) => {
      state.cvv = action.payload;
    },
    setExpiryDate: (state, action) => {
      state.expiry_date = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setSelectedMethod: (state, action) => {
      state.selectedMethod = action.payload;
    },
    setIsDropdownOpen: (state, action) => {
      state.isDropdownOpen = action.payload;
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
    setPaymentSuccess: (state, action) => {
      state.paymentSuccess = action.payload;
    },
  },
});

export const {
  setBookingCode,
  setCardNumber,
  setCardHolderName,
  setCvv,
  setExpiryDate,
  setSelectedMonth,
  setSelectedYear,
  setSelectedMethod,
  setIsDropdownOpen,
  setError,
  clearError,
  setLoading,
  setPaymentSuccess,
} = paymentSlice.actions;

export default paymentSlice.reducer;
