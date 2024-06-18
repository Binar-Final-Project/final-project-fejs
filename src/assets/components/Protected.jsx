import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected() {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.login); //MENGAMBIL TOKEN

  // JIKA TOKEN TIDAK ADA, MAKA AKAN MENAMPILKAN ALERT DAN DIRECT KE LOGIN PAGE
  useEffect(() => {
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        toast("Anda harus login terlebih dahulu!", {
          icon: null,
          style: {
            background: "#FF0000", // Background merah
            color: "#FFFFFF",
            borderRadius: "12px",
            fontSize: "14px", // Ukuran font
            textAlign: "center", // Posisi teks di tengah
            padding: "10px 20px", // Padding
          },
        });
      }, 3000);
    }
  }, []);

  return;
}
