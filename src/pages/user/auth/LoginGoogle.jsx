import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../../redux/actions/auth/googleActions";

export default function LoginGoogle({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Menghandle login dengan Google
  const handleLoginWithGoogle = async (responseGoogle) => {
    const accessToken = responseGoogle.access_token; // Mendapatkan access token dari response Google
    dispatch(loginWithGoogle(accessToken, navigate)); // Memanggil fungsi loginWithGoogle dengan access token dan fungsi navigate
  };

  // Menggunakan useGoogleLogin untuk login dengan Google
  const googleLoginHandler = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function"); // Menyimpan informasi login di local storage
      handleLoginWithGoogle(responseGoogle); // Memanggil fungsi handleLoginWithGoogle dengan response Google
    },
  });

  return (
    <button
      onClick={googleLoginHandler}
      className="bg-white text-[#2A629A] text-sm font-medium border border-[#2A629A] focus-within:border-gray-500 p-2 rounded-xl w-full transition-colors duration-300 hover:bg-[#D0D0D0] active:bg-[#D0D0D0] flex items-center justify-center"
    >
      <FcGoogle className="w-5 h-5 mr-5" />
      {buttonText}
    </button>
  );
}
