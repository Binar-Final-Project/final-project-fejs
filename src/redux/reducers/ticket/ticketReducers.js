import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ticket: [],
    passenger: [],
};

const ticketSlicer = createSlice ({
    name: "ticket",
    initialState,
    reducers: {
        setTicket: (state, action) => {
            state.ticket = action.payload;
        },
        setPassengers: (state, action) => {
            state.passenger = action.payload;
        },
        
    },
});

export const { setTicket, setPassengers } = ticketSlicer.actions;

export default ticketSlicer.reducer;