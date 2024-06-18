import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../redux/actions/auth/loginActions";

export default function Protected() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(checkToken(navigate));
  }, []);

  return;
}
