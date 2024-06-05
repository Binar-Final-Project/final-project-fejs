import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import loginReducers from "../reducers/auth/loginReducers";
import registerReducers from "../reducers/auth/registerReducers";
import otpReducers from "../reducers/auth/otpReducers";
import passwordSlice from "../reducers/auth/passwordSlice";
import flightReducers from "../reducers/flight/flightReducers";
import userReducers from "../reducers/user/userReducers";

const rootReducer = combineReducers({
  login: loginReducers,
  register: registerReducers,
  otp: otpReducers,
  authPass: passwordSlice,
  flight: flightReducers,
  user: userReducers,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
