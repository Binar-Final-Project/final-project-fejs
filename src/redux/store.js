import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import loginReducers from "./reducers/loginReducers";
import registerReducers from "./reducers/registerReducers";
import otpReducers from "./reducers/otpReducers";
import flightReducers from "./reducers/flightReducers";

const rootReducer = combineReducers({
  login: loginReducers,
  register: registerReducers,
  otp: otpReducers,
  flight: flightReducers,
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
