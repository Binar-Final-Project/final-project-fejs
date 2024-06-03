import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/store.js";
import { PersistGate } from "redux-persist/integration/react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <GoogleOAuthProvider clientId="510075300623-05o5me1fc90iqslnco58vnpcc9j0ft22.apps.googleusercontent.com"> */}
        <App />
        {/* </GoogleOAuthProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
