import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { setOtpInput, setEmail } from "../redux/reducers/otpReducers"; // Import setEmail
import { verifyOtp } from "../redux/actions/otpActions";
import backgroundImage from "../assets/images/otp.png";

export default function VerifyOTP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otpInput, error } = useSelector((state) => state.otp);
  const registerEmail = useSelector((state) => state.register.email); // Mengambil email dari state register

  useEffect(() => {
    console.log("Email dari state register:", registerEmail); // Cek nilai email dari state register
    dispatch(setOtpInput("")); // Mengosongkan otpInput ketika komponen pertama kali dimuat
    if (registerEmail) {
      dispatch(setEmail(registerEmail));
    }
    dispatch(setEmail(registerEmail)); // Mengatur email saat komponen dimuat
  }, [dispatch, registerEmail]);

  useEffect(() => {
    if (otpInput.length === 6 && !error) {
      dispatch(verifyOtp(navigate));
    }
  }, [otpInput, error, dispatch, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtpInput = [...otpInput];
    newOtpInput[index] = element.value;
    dispatch(setOtpInput(newOtpInput.join("")));

    // Focus next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && !otpInput[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    if (otpInput.length < 6) {
      toast.error("Harap isi kode OTP terlebih dahulu.", {
        // Menampilkan toast error
        style: {
          background: "#E60039", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "bottom-center", // Posisi toast
        duration: 4000, // Durasi toast
      });
      return;
    }

    dispatch(verifyOtp(navigate));
  };

  return (
    <div>
      <style>
        {`
          body, html {
            overflow: hidden;
          }
          `}
      </style>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div className="flex justify-center items-center min-h-screen w-full">
          <Toaster />
          <div className="max-w-[400px] w-full rounded-lg p-5 m-4 sm:m-8 bg-[#FFF8ED] text-center relative shadow-lg">
            <BiArrowBack
              className="absolute top-4 left-4 cursor-pointer text-[#2A629A]"
              size={20}
              onClick={() => navigate("/register")}
            />
            <div className="max-w-[550px] mx-auto flex flex-col items-center mt-5">
              <h1 className="text-[#003285] text-2xl font-bold text-center w-full mb-6">
                Verifikasi Email
              </h1>
              <h2 className="text-[#2A629A] text-l mb-6 text-center text-sm">
                Ketik 6 Digit Kode OTP yang Dikirim ke Email Anda
              </h2>

              <form onSubmit={handleVerify} className="w-full">
                <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-5">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      name="otp"
                      maxLength="1"
                      value={otpInput[index] || ""}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-[#2A629A] rounded-lg focus:border-[#2A629A]"
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-[#2A629A] text-white text-sm p-2 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                >
                  Verifikasi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
