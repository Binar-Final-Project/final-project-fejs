import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/user/auth/Login.jsx";
import Register from "./pages/user/auth/Register.jsx";
import VerifyOTP from "./pages/user/auth/VerifyOTP.jsx";
import EmailResetPassword from "./pages/user/auth/EmailResetPassword";
import ForgotPassword from "./pages/user/auth/ForgotPassword";
import Home from "./pages/user/flight/Home.jsx";
import Profile from "./pages/user/flight/profile/Profile.jsx";
import PengaturanAkun from "./pages/user/flight/profile/PengaturanAkun.jsx";
import NotFound from "./pages/user/flight/NotFound.jsx";
import Payment from "./pages/user/flight/Payment.jsx";
import Checkout from "./pages/user/flight/ticket/Checkout.jsx";
import Protected from "./assets/components/Protected.jsx";
import UbahAkun from "./pages/user/flight/profile/UbahAkun.jsx";
import SearchResult from "./pages/user/flight/SearchResult.jsx";
import Notification from "./pages/user/flight/Notification.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<EmailResetPassword />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        {/* USER */}
        <Route path="*" element={<NotFound />} />

        {/* FLIGHT */}
        <Route path="/payment" element={<Payment />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/" element={<Home />} />
        <Route
          path="/profil"
          element={
            <div>
              <Protected />
              <Profile />
            </div>
          }
        />
        <Route
          path="/ubah-akun"
          element={
            <div>
              <Protected />
              <UbahAkun />
            </div>
          }
        />
        <Route
          path="/pengaturan-akun"
          element={
            <div>
              <Protected />
              <PengaturanAkun />
            </div>
          }
        />
        <Route path="/hasil-pencarian" element={<SearchResult />} />
        <Routes
          path="/notifikasi"
          element={
            <div>
              <Protected />
              <Notification />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
