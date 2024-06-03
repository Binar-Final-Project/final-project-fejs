import axios from "axios";
import { toast } from "react-hot-toast";
import { setError, clearError } from "../reducers/otpReducers";

// Action untuk verifikasi OTP
export const verifyOtp = (navigate) => async (dispatch, getState) => {
  const { otpInput } = getState().otp;
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  try {
    // Membuat permintaan ke API untuk verifikasi OTP
    const response = await axios.post(
      "https://express-production-3572.up.railway.app/api/v1/users/verification-otp",
      { otp_number: otpInput, email: email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Logging respons dari server
    console.log("Respons dari server:", response.data);

    if (response.data.status === true) {
      dispatch(clearError());
      toast.success(
        "Verifikasi email berhasil! Silakan masuk untuk melanjutkan",
        {
          // Menampilkan toast sukses
          icon: null,
          style: {
            background: "#28A745", // Background hijau
            color: "#FFFFFF", // Teks putih
            borderRadius: "12px",
            fontSize: "14px", // Ukuran font
            textAlign: "center", // Posisi teks di tengah
            padding: "10px 20px", // Padding
          },
          position: "bottom-center", // Posisi toast
          duration: 4000, // Durasi toast
        }
      );
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } else {
      throw new Error("Verifikasi OTP gagal");
    }
  } catch (error) {
    console.error(
      "Error verifying OTP:",
      error.response?.data || error.message
    );
    dispatch(setError("Kode OTP salah! Silakan coba lagi"));
    toast.error("Kode OTP salah! Silakan coba lagi", {
      // Menampilkan toast error
      icon: null,
      style: {
        background: "#FF0000", // Background merah
        color: "#FFFFFF", // Teks putih
        borderRadius: "12px", // Rounded-xl
        fontSize: "14px", // Ukuran font
        textAlign: "center", // Posisi teks di tengah
        padding: "10px 20px", // Padding
      },
      position: "bottom-center", // Posisi toast
      duration: 4000, // Durasi toast
    });
  }
};
