import axios from "axios";
import { toast } from "react-hot-toast";
import { setError, clearError } from "../../reducers/auth/otpReducers";

// Action untuk verifikasi OTP
export const verifyOtp = (navigate) => async (dispatch, getState) => {
  const { otpInput } = getState().otp;
  const registerEmail = getState().register.email;
  // console.log("registerEmail: ", registerEmail);
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  // console.log("email: ", email);

  try {
    // Logging data yang dikirim ke API
    // console.log("Mengirim OTP untuk verifikasi:", {
    //   otp_number: otpInput,
    //   email: registerEmail,
    // });

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
    // console.log("Respons dari server:", response.data);

    if (response.data.status === true) {
      dispatch(clearError());
      toast.success(
        "Verifikasi email berhasil! Silakan masuk untuk melanjutkan",
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
    dispatch(
      setError("Kode OTP salah atau sudah kedaluwarsa. Silakan coba lagi.")
    );
    toast.error("Kode OTP salah atau sudah kedaluwarsa. Silakan coba lagi.", {
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
    });
  }
};
