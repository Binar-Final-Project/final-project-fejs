import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import EmailResetPassword from './pages/user/auth/EmailResetPassword';
import ForgotPassword from './pages/user/auth/ForgotPassword';
import Home from "./pages/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import PengaturanAkun from "./pages/profile/PengaturanAkun.jsx";
import NotFound from "./pages/NotFound.jsx";

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
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/pengaturan-akun" element={<PengaturanAkun />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

