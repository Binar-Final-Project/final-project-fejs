import { combineReducers } from "@reduxjs/toolkit";
import passwordSlice from "./auth/passwordSlice";

export default combineReducers({
    authPass: passwordSlice,
});