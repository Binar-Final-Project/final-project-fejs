import axios from "axios";
import toast from "react-hot-toast";
import {
  setUser,
  setToken,
  clearError,
  setIsLoggedIn,
} from "../../reducers/auth/loginReducers";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const responseLogin = await axios.post(
      "https://express-production-3572.up.railway.app/api/v1/users/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (responseLogin.status === 200) {
      dispatch(setUser(responseLogin?.data)); // Mengatur setUser ke Reducers
      dispatch(clearError()); // Menghapus error ke Reducers
      dispatch(setToken(responseLogin?.data?.data?.token));
      dispatch(setIsLoggedIn(true)); // Mengatur setIsLoggedIn menjadi true ke Reducers
      toast.success("Berhasil masuk, selamat menikmati perjalananmu!", {
        //Menampilkan toast sukses
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
      setTimeout(() => {
        navigate("/home");
      }, 4000);
    }
    console.log("Response Login: ", responseLogin);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // dispatch(setError("Alamat Email tidak terdaftar"));
      toast.error("Alamat Email tidak terdaftar. Silakan coba lagi", {
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
    } else if (error.response && error.response.status === 401) {
      // dispatch(setError("Password salah. Silakan coba lagi"));
      toast.error("Password salah. Silakan coba lagi", {
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
    } else {
      // dispatch(setError("Email dan password salah. Silakan coba lagi"));
      toast.error("Email atau password salah. Silakan coba lagi", {
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
  }
};
