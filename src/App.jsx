import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import VerifyOTP from "./VerifyOTP.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import PengaturanAkun from "./pages/profile/PengaturanAkun.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/pengaturan-akun" element={<PengaturanAkun />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </BrowserRouter>
  );
}
