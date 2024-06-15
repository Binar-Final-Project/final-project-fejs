import axios from "axios";
import toast from "react-hot-toast";
import {
  setUser,
  setError,
  clearError,
} from "../../reducers/auth/googleReducers";
import { setToken, setIsLoggedIn } from "../../reducers/auth/loginReducers";
import { setProfile } from "../../reducers/user/userReducers";

export const loginWithGoogle = (accessToken, navigate) => async (dispatch) => {
  try {
    const responseLoginGoogle = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
      {
        access_token: accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token } = responseLoginGoogle.data.data; // Mendapatkan token dari response data
    console.log("Token Login Google: ", token);
    dispatch(setUser(responseLoginGoogle?.data)); // Mengatur data pengguna ke Reducers
    dispatch(clearError()); // Menghapus error ke Reducers
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true)); // Mengatur setIsLoggedIn menjadi true ke Reducers
    toast.success(
      "Berhasil masuk dengan Google, selamat menikmati perjalananmu.",
      {
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
        position: "top-center", // Posisi toast
        duration: 4000, // Durasi toast
      }
    );
    setTimeout(() => {
      navigate("/", { state: { token: token } });
    }, 4000);
    console.log("Response Login Google: ", responseLoginGoogle);
  } catch (error) {
    console.log(error); // Menampilkan error di konsol
    dispatch(setError("Gagal masuk dengan Google. Silakan coba lagi.")); // Mengatur pesan error ke Reducers
    toast.error("Gagal masuk dengan Google. Silakan coba lagi.", {
      style: {
        background: "#FF0000", // Background merah
        color: "#FFFFFF", // Teks putih
        borderRadius: "12px",
        fontSize: "14px", // Ukuran font
        textAlign: "center", // Posisi teks di tengah
        padding: "10px 20px", // Padding
      },
      position: "top-center", // Posisi toast
      duration: 4000, // Durasi toast
    });
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch(setToken(null)); // MENGHAPUS TOKEN
    dispatch(setIsLoggedIn(false)); // MENGEMBALIKAN JADI FALSE
    dispatch(setProfile([]));
    if (navigate) {
      setTimeout(() => {
        navigate("/"); // KE HOME PAGE DALAM WAKTU 0.5 DETIK
      }, 500);
      toast("Berhasil keluar!", {
        // Menampilkan toast sukses
        icon: null,
        style: {
          background: "#28A745", // Background hijau
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
  } catch (error) {
    console.log("error logout", error);
  }
};
