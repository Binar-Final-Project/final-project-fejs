import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import { BiSolidCheckCircle, BiErrorCircle } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../../../redux/actions/auth/loginActions";
import {
  setEmail,
  setPassword,
  setShowPassword,
  setPasswordTouched,
  clearError,
} from "../../../redux/reducers/auth/loginReducers";
import backgroundImage from "../../../assets/images/loginregister.png";

export default function LoginUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    email,
    isEmailValid,
    password,
    showPassword,
    isPasswordTouched,
    error,
  } = useSelector((state) => state.login);

  // Mengatur ulang state ketika komponen di-unmount
  useEffect(() => {
    return () => {
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setPasswordTouched(false));
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handler untuk perubahan input email
  const handleEmailChange = (event) => {
    dispatch(clearError());
    dispatch(setEmail(event.target.value));
  };

  // Handler untuk perubahan input password
  const handlePasswordChange = (event) => {
    dispatch(clearError());
    dispatch(setPassword(event.target.value));
    if (!isPasswordTouched) {
      dispatch(setPasswordTouched(true));
    }
  };

  // Handler untuk toggle visibilitas password
  const togglePasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowPassword(!showPassword));
  };

  // Handler untuk fokus input password
  const handlePasswordFocus = () => {
    if (!isPasswordTouched) {
      dispatch(setPasswordTouched(true));
    }
  };

  // Handler untuk blur input password
  const handlePasswordBlur = () => {
    if (password === "") {
      dispatch(setPasswordTouched(false));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
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
    }
  }, [error]);

  // Handler untuk proses masuk akun
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Mohon input semua field terlebih dahulu!", {
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

    if (!isEmailValid) {
      toast.error("Mohon input Email dengan benar!", {
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

    dispatch(login(email, password, navigate));
  };

  const passwordInputType = showPassword ? "text" : "password";

  // Validasi password (minimal 8 karakter, termasuk huruf besar dan angka)
  const isPasswordValid =
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

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
          <div className="max-w-[400px] w-full rounded-lg p-5 m-4 sm:m-8 bg-[#FFF8ED] text-center relative shadow-lg">
            <BiArrowBack
              className="absolute top-4 left-4 cursor-pointer text-[#2A629A]"
              size={20}
              onClick={() => navigate("/")}
            />
            <Toaster />
            <div className="max-w-[550px] mx-auto flex flex-col items-center">
              <h1 className="text-[#003285] text-2xl font-bold text-center w-full mt-3 mb-6">
                Masuk
              </h1>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col space-y-1">
                    <label className="text-left text-[#2A629A] text-sm">
                      Email
                    </label>
                    <div
                      className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg
                            ${
                              email
                                ? isEmailValid
                                  ? "focus-within:border-[#2A629A]"
                                  : "focus-within:border-red-500"
                                : "focus-within:border-[#2A629A]"
                            } 
                            ${
                              !isEmailValid && email
                                ? "border-red-500"
                                : "border-[#D0D0D0]"
                            }`}
                    >
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                        type="text"
                        placeholder="Alamat Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {isEmailValid && (
                        <BiSolidCheckCircle className="w-[21px] h-[21px] text-[#188E55]" />
                      )}
                      {!isEmailValid && email && (
                        <RxCrossCircled className="text-red-500 w-[20px] h-[20px] ml-2" />
                      )}
                    </div>
                    {!isEmailValid && email && (
                      <p className="text-red-500 text-xs mt-1 text-left">
                        Format Email salah
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-left text-[#2A629A] text-sm">
                        Password
                      </label>
                      <a
                        href="forgot-password"
                        className="text-[#2A629A] text-sm"
                      >
                        Lupa Password
                      </a>
                    </div>
                    <div
                      className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg
                            ${
                              password
                                ? isPasswordValid
                                  ? "focus-within:border-[#2A629A]"
                                  : "focus-within:border-red-500"
                                : "focus-within:border-[#2A629A]"
                            } 
                            ${
                              isPasswordTouched && !isPasswordValid
                                ? "border-red-500"
                                : "border-[#D0D0D0]"
                            }`}
                    >
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                        type={passwordInputType}
                        placeholder="Masukkan Password"
                        value={password}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        onChange={handlePasswordChange}
                      />
                      {showPassword ? (
                        <FiEye
                          className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FiEyeOff
                          className="w-[17px] h-[17px] text-[#8A8A8A] cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                    {isPasswordTouched && !isPasswordValid && (
                      <div className="flex items-center text-red-500 text-xs mt-1 text-left">
                        <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                        <p>
                          Password berisi minimal 8 karakter, termasuk huruf
                          besar dan angka
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-[#2A629A] text-white text-sm p-2 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                  >
                    Masuk
                  </button>
                </div>
              </form>

              <p className="text-[#2A629A] mt-7 mb-3 text-sm">
                Baru di{" "}
                <a
                  href="/"
                  className="text-[#2A629A] mt-7 mb-3 text-sm font-semibold"
                >
                  BiFlight
                </a>
                <span className="text-[#2A629A] mt-7 mb-3 text-sm">? </span>
                <a
                  href="/register"
                  className="text-[#40A2E3] font-semibold text-sm"
                >
                  Daftar
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
