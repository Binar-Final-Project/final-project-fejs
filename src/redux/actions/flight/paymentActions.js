import axios from "axios";
import toast from "react-hot-toast";
import {
  setCardNumber,
  setCardHolderName,
  setCvv,
  setExpiryDate,
  setSelectedMethod,
  setIsDropdownOpen,
  setError,
  clearError,
  setLoading,
  setPaymentSuccess,
} from "../../reducers/flight/paymentReducers";
import { setIsLoggedIn, setToken } from "../../reducers/auth/loginReducers";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const processPayment = (paymentData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await delay(5000); // Menunggu selama 5 detik
    const response = await axios.post(
      "https://express-production-3572.up.railway.app/api/v1/transactions/pay",
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      dispatch(setPaymentSuccess(true));
      dispatch(clearError());
      toast.success("Pembayaran berhasil!", {
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
      });
    }
  } catch (error) {
    console.log("Payment error:", error);
    if (error?.response?.status === 401) {
      toast.error("Sesi Anda telah habis. Silakan login terlebih dahulu.", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 4000, // Durasi toast
      });
      setTimeout(() => {
        navigate("/login");
      }, 4000);
      dispatch(setToken(null));
      dispatch(setIsLoggedIn(false));
    } else {
      toast.error("Pembayaran gagal. Silakan coba lagi.", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 4000, // Durasi toast
      });
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const resetPaymentState = () => (dispatch) => {
  dispatch(setCardNumber(""));
  dispatch(setCardHolderName(""));
  dispatch(setCvv(""));
  dispatch(setExpiryDate(""));
  dispatch(setSelectedMethod(""));
  dispatch(setIsDropdownOpen(false));
  dispatch(setError(null));
  dispatch(setLoading(false));
  dispatch(setPaymentSuccess(false));
};
