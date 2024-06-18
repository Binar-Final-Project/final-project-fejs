import axios from "axios";
import toast from "react-hot-toast";
import {
  setUser,
  setToken,
  setError,
  clearError,
  setIsLoggedIn,
} from "../../reducers/auth/loginReducers";
import { setProfile } from "../../reducers/user/userReducers";

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
      toast.success(`Berhasil masuk, selamat datang ${email}!`, {
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
        duration: 3000, // Durasi toast
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    console.log("Response Login: ", responseLogin);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // dispatch(setError("Alamat Email tidak terdaftar"));
      toast.error("Alamat Email tidak terdaftar. Silakan coba lagi.", {
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
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    } else if (error.response && error.response.status === 401) {
      // dispatch(setError("Password salah. Silakan coba lagi"));
      toast.error("Kata sandi salah. Silakan coba lagi", {
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
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    } else {
      // dispatch(setError("Email dan password salah. Silakan coba lagi"));
      toast.error("Email atau kata sandi salah. Silakan coba lagi", {
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
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    }
  }
};

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
    toast.success("Berhasil masuk dengan Google, selamat datang.", {
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
      duration: 3000, // Durasi toast
    });
    setTimeout(() => {
      navigate("/", { state: { token: token } });
    }, 3000);
    console.log("Response Login Google: ", responseLoginGoogle);
  } catch (error) {
    console.log(error); // Menampilkan error di konsol
    dispatch(setError("Gagal masuk dengan Google. Silakan coba lagi.")); // Mengatur pesan error ke Reducers
    toast.error("Gagal masuk dengan Google. Silakan coba lagi.", {
      style: {
        background: "#FF0000", // Background merah
        color: "#FFFFFF", // Teks putih
        borderRadius: "12px", // Ukuran font
        fontSize: "14px", // Ukuran font
        textAlign: "center", // Posisi teks di tengah
        padding: "10px 20px", // Padding
      },
      position: "top-center", // Posisi toast
      duration: 3000, // Durasi toast
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
      toast("Terima kasih, sampai jumpa!", {
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
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
    }
  } catch (error) {
    console.log("error logout", error);
  }
};

// CHECK TOKEN UNTUK PROTECTED
export const checkToken = (navigate) => (dispatch, getState) => {
  const { token, isLoggedin } = getState().login;
  if (token === null || isLoggedin === false) {
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
    }, 500);
  }
};
