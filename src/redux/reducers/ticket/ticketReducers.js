import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ticket: [],
};

const ticketSlicer = createSlice ({
    name: "ticket",
    initialState,
    reducers: {
        setTicket: (state, action) => {
            state.ticket = action.payload;
        },
    },
});

export const { setTicket } = ticketSlicer.actions;

export default ticketSlicer.reducer;