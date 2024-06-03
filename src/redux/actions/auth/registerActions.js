import axios from "axios";
import toast from "react-hot-toast";
import {
  setError,
  clearError,
  setPasswordStrength,
} from "../../reducers/auth/registerReducers";

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

      console.log("responseRegister.data: ", responseRegister.data);
      if (
        responseRegister.data.status === true &&
        responseRegister.data.data.email !== ""
      ) {
        dispatch(clearError());
        setTimeout(() => {
          navigate(`/verify-otp?email=${email}`);
        }, 4000);
        toast.success(
          "Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi dengan kode OTP",
          {
            style: {
              background: "#73CA5C",
              color: "#FFFFFF",
              borderRadius: "12px",
              fontSize: "14px",
              textAlign: "center",
              padding: "10px 20px",
            },
            position: "bottom-center",
            duration: 4000,
          }
        );
      }
      console.log("Data: ", responseRegister.data);
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );

      // Mengecek respons error
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }

      dispatch(
        setError(
          "Pendaftaran gagal! Email dan nomor telepon ini mungkin sudah terdaftar. Silakan coba lagi"
        )
      );
      toast.error(
        "Pendaftaran gagal! Email ini mungkin sudah terdaftar. Silakan coba lagi",
        {
          style: {
            background: "#E60039",
            color: "#FFFFFF",
            borderRadius: "12px",
            fontSize: "14px",
            textAlign: "center",
            padding: "10px 20px",
          },
          position: "bottom-center",
          duration: 4000,
        }
      );
    }
  };
