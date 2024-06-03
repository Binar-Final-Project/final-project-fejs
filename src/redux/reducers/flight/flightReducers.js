import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  airports: [],
  isLoading: true,
};

const flightSlicer = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setFlights, setIsLoading } = flightSlicer.actions;

export default flightSlicer.reducer;
