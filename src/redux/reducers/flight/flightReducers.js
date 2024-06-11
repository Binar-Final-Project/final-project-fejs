import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  pages: null,
  isLoading: true,
  choosenFlight: [],
};

const flightSlicer = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setChoosenFlight: (state, action) => {
      state.choosenFlight = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setFlights, setPages, setIsLoading, setChoosenFlight } =
  flightSlicer.actions;

export default flightSlicer.reducer;
