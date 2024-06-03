import axios from "axios";
import toast from "react-hot-toast";
import {
  setError,
  clearError,
  setPasswordStrength,
} from "../../reducers/auth/registerReducers";

// Action untuk registrasi akun
export const register =
  (email, name, password, phone_number, navigate) => async (dispatch) => {
    try {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        dispatch(setPasswordStrength("weak"));
      } else if (password.length >= 10) {
        dispatch(setPasswordStrength("strong"));
      } else {
        dispatch(setPasswordStrength("medium"));
      }

      const responseRegister = await axios.post(
        "https://express-production-3572.up.railway.app/api/v1/users/register",
        {
          name: name,
          email: email,
          phone_number: phone_number,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        responseRegister.data.status === true &&
        responseRegister.data.data.email !== ""
      ) {
        dispatch(clearError());
        setTimeout(() => {
          navigate(`/verify-otp?email=${email}`);
        }, 4000);
        toast.success(
          "Pendaftaran berhasil! Cek email Anda untuk verifikasi dengan kode OTP",
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
      }
      // console.log("Data: ", responseRegister.data);
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );

      dispatch(
        setError(
          "Pendaftaran gagal! Email atau nomor telepon ini mungkin sudah terdaftar. Silakan coba lagi"
        )
      );
      toast.error(
        "Pendaftaran gagal! Email atau nomor telepon ini mungkin sudah terdaftar. Silakan coba lagi",
        {
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
        }
      );
    }
  };
