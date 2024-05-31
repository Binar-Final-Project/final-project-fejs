import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidCheckCircle, BiErrorCircle } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import { register } from "./redux/actions/registerActions";
import {
  setName,
  setNameTouched,
  setEmail,
  setPassword,
  setShowPassword,
  setPasswordStrength,
  setConfirmPassword,
  setShowConfirmPassword,
  setPhoneNumber,
  clearError,
} from "./redux/reducers/registerReducers";
import backgroundImage from "./loginregister.png";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    name,
    isNameTouched,
    email,
    isEmailValid,
    password,
    showPassword,
    passwordStrength,
    confirmPassword,
    showConfirmPassword,
    phone_number,
    isPhoneNumberValid,
  } = useSelector((state) => state.register); // Mengambil data dari Reducers menggunakan useSelector

  // Mengatur ulang state ketika komponen di-unmount
  useEffect(() => {
    return () => {
      dispatch(setName("")); // Mengatur nama ke nilai kosong di Reducers
      dispatch(setNameTouched(false)); // Mengatur nama ke nilai false di Reducers
      dispatch(setEmail("")); // Mengatur email ke nilai kosong di Reducers
      dispatch(setPhoneNumber("")); // Mengatur nomor telepon ke nilai kosong di Reducers
      dispatch(setPassword("")); // Mengatur password ke nilai kosong di Reducers
      dispatch(setConfirmPassword("")); // Mengatur password ke nilai kosong di Reducers
      dispatch(clearError()); // Menghapus error di Reducers
    };
  }, [dispatch]);

  // Handler untuk perubahan input nama
  const handleNameChange = (event) => {
    dispatch(clearError());
    dispatch(setName(event.target.value)); // Actions untuk mengatur nama ke Reducers
    if (!isNameTouched) {
      dispatch(setNameTouched(true));
    }
  };

  // Handler untuk fokus input nama
  const handleNameFocus = () => {
    if (!isNameTouched) {
      dispatch(setNameTouched(true));
    }
  };

  // Handler untuk blur input nama
  const handleNameBlur = () => {
    if (name === "") {
      dispatch(setNameTouched(false));
    }
  };

  // Handler untuk perubahan input email
  const handleEmailChange = (event) => {
    dispatch(clearError());
    dispatch(setEmail(event.target.value)); // Actions untuk mengatur email ke Reducers
  };

  // Handler untuk perubahan input nomor telepon
  const handlePhoneNumberChange = (event) => {
    dispatch(clearError());
    const { value } = event.target;
    const isValidPhoneNumber = /^\d*$/.test(value); // Mengizinkan angka atau kosong
    if (isValidPhoneNumber) {
      dispatch(setPhoneNumber(value)); // Actions untuk mengatur nomor telepon ke Reducers
    }
  };

  // Handler untuk perubahan input password
  const handlePasswordChange = (event) => {
    dispatch(clearError());
    const { value } = event.target;
    dispatch(setPassword(value));
    // Menambahkan logika untuk menentukan kekuatan password
    if (value.length < 8) {
      dispatch(setPasswordStrength("weak"));
    } else if (value.length >= 8 && value.length < 12) {
      dispatch(setPasswordStrength("medium"));
    } else {
      dispatch(setPasswordStrength("strong"));
    }
  };

  // Handler untuk toggle visibilitas password
  const togglePasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowPassword(!showPassword)); // Actions untuk mengatur showPassword ke Reducers
  };

  // Handler untuk perubahan input konfirmasi password
  const handleConfirmPasswordChange = (event) => {
    dispatch(clearError());
    dispatch(setConfirmPassword(event.target.value)); // Update confirmPassword
  };

  // Handler untuk toggle visibilitas konfirmasi password
  const toggleConfirmPasswordVisibility = () => {
    dispatch(clearError());
    dispatch(setShowConfirmPassword(!showConfirmPassword)); // Actions untuk mengatur showConfirmPassword ke Reducers
  };

  // Handler untuk proses registrasi akun
  const handleRegister = async (event) => {
    event.preventDefault();
    if (!name) {
      toast.error("Mohon input nama Anda terlebih dahulu!", {
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

    if (!email) {
      toast.error("Mohon input alamat Email Anda terlebih dahulu!", {
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

    if (!phone_number) {
      toast.error("Mohon input nomor telepon Anda terlebih dahulu!", {
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

    if (!password) {
      toast.error("Mohon buat password Anda terlebih dahulu!", {
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

    if (!confirmPassword) {
      toast.error("Mohon input konfirmasi password Anda terlebih dahulu!", {
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

    if (!name || !email || !phone_number || !password || !confirmPassword) {
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

    if (phone_number.length < 8) {
      toast.error("Mohon input nomor telepon dengan benar!", {
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

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password harus berisi minimal 8 karakter, termasuk huruf besar dan angka",
        {
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
        }
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password yang Anda masukkan tidak sama.", {
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
      return;
    }

    console.log("Register data:", {
      name,
      email,
      phone_number,
      password,
    });

    dispatch(register(email, name, password, phone_number, navigate)); // Mengirim actions register ke Reducers dengan email, name, password, phoneNumber, dan navigate function
  };

  const passwordInputType = showPassword ? "text" : "password"; // Menentukan tipe input untuk password
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password"; // Menentukan tipe input untuk konfirmasi password
  const passwordsMatch = password === confirmPassword;

  return (
    <div>
      {/* <style>
        {`
          body, html {
            overflow: hidden;
          }
          `}
      </style> */}
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
          <div className="max-w-[400px] w-full rounded-lg p-5 m-4 sm:m-8 bg-[#FFF8ED] text-center shadow-lg">
            <div className="max-w-[550px] mx-auto flex flex-col items-center">
              <h1 className="text-[#003285] text-2xl mb-1 font-bold text-center w-full">
                Daftar Sekarang
              </h1>
              <h2 className="text-[#2A629A] text-sm mb-6 text-center w-full">
                Masukkan Data Diri Anda
              </h2>

              <form onSubmit={handleRegister} className="w-full">
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col space-y-1">
                    <label className="text-left text-[#2A629A] text-sm">
                      Nama
                    </label>
                    <div
                      className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg
                    ${
                      name
                        ? isNameTouched
                          ? "focus-within:border-[#2A629A]"
                          : "focus-within:border-red-500"
                        : "focus-within:border-[#2A629A]"
                    } 
                    ${
                      !isNameTouched && name
                        ? "border-red-500"
                        : "border-[#D0D0D0]"
                    }`}
                    >
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                        type="text"
                        placeholder="Nama Lengkap"
                        value={name}
                        onFocus={handleNameFocus}
                        onBlur={handleNameBlur}
                        onChange={handleNameChange}
                      />
                    </div>
                    {isNameTouched && !name && (
                      <div className="flex items-center text-red-500 text-xs mt-1 text-left">
                        <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                        <p>Nama harus diisi</p>
                      </div>
                    )}
                  </div>
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
                    <label className="text-left text-[#2A629A] text-sm">
                      Nomor Ponsel
                    </label>
                    <div
                      className={`flex items-center rounded-xl border focus-within:shadow-lg
                    ${
                      phone_number
                        ? isPhoneNumberValid
                          ? "focus-within:border-[#2A629A]"
                          : "focus-within:border-red-500"
                        : "focus-within:border-[#2A629A]"
                    } 
                    ${
                      !isPhoneNumberValid && phone_number
                        ? "border-red-500"
                        : "border-[#D0D0D0]"
                    }`}
                    >
                      <div className="flex items-center bg-gray-300 p-2 px-3 rounded-l-xl border-r-0">
                        <span className="text-sm text-[#2A629A]">+62</span>
                      </div>
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A] pl-2"
                        type="text"
                        placeholder="8123456789"
                        value={phone_number}
                        onChange={handlePhoneNumberChange}
                      />
                      {isPhoneNumberValid && (
                        <BiSolidCheckCircle className="w-[21px] h-[21px] text-[#188E55] mr-2" />
                      )}
                      {!isPhoneNumberValid &&
                        phone_number &&
                        phone_number.length > 0 && (
                          <RxCrossCircled className="text-red-500 w-[20px] h-[20px] mr-2.5" />
                        )}
                    </div>
                    {!isPhoneNumberValid &&
                      phone_number &&
                      phone_number.length > 0 && (
                        <p className="text-red-500 text-xs mt-1 text-left">
                          Nomor ponsel terlalu pendek, minimum 8 angka
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-left text-[#2A629A] text-sm">
                      Password
                    </label>
                    <div className="flex items-center p-2 rounded-xl border border-[#D0D0D0] focus-within:border-[#2A629A] focus-within:shadow-lg">
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                        type={passwordInputType}
                        placeholder="Password"
                        value={password}
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
                    {password && (
                      <div className="flex items-center mt-1">
                        <div className="flex-shrink-0 w-[20px] h-[20px] mr-1">
                          {passwordStrength === "weak" && (
                            <BiErrorCircle className="text-red-500 w-[20px] h-[20px]" />
                          )}
                          {passwordStrength === "medium" && (
                            <BiErrorCircle className="text-yellow-500 w-[20px] h-[20px]" />
                          )}
                          {passwordStrength === "strong" && (
                            <BiSolidCheckCircle className="text-[#188E55] w-[20px] h-[20px]" />
                          )}
                        </div>
                        <p className="text-xs">
                          {passwordStrength === "weak"
                            ? "Password lemah"
                            : passwordStrength === "medium"
                            ? "Password sedang"
                            : "Password kuat"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-left text-[#2A629A] text-sm">
                      Konfirmasi Password
                    </label>
                    <div className="flex items-center p-2 rounded-xl border border-[#D0D0D0] focus-within:border-[#2A629A] focus-within:shadow-lg">
                      <input
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                        type={confirmPasswordInputType}
                        placeholder="Konfirmasi Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      {showConfirmPassword ? (
                        <FiEye
                          className="w-[17px] h-[17px] text-[#6B7280] cursor-pointer"
                          onClick={toggleConfirmPasswordVisibility}
                        />
                      ) : (
                        <FiEyeOff
                          className="w-[17px] h-[17px] text-[#6B7280] cursor-pointer"
                          onClick={toggleConfirmPasswordVisibility}
                        />
                      )}
                    </div>
                    {!passwordsMatch && confirmPassword && (
                      <div className="flex items-center text-red-500 text-xs mt-1 text-left">
                        <RxCrossCircled className="w-[20px] h-[20px] mr-1" />
                        <p>Konfirmasi password tidak cocok dengan password</p>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-[#2A629A] text-white text-sm p-2 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                  >
                    Daftar
                  </button>
                </div>
              </form>

              <p className="text-[#2A629A] mt-7 mb-3 text-sm">
                Sudah punya akun{" "}
                <a
                  href="/home"
                  className="text-[#2A629A] mt-7 mb-3 text-sm font-semibold"
                >
                  BiFlight
                </a>
                <span className="text-[#2A629A] mt-7 mb-3 text-sm">? </span>
                <a
                  href="/login"
                  className="text-[#40A2E3] font-semibold text-sm"
                >
                  Masuk di sini
                </a>
              </p>
              {/* <p className="text-[#2A629A] mt-7 mb-3 text-sm flex flex-col">
                Dengan mendaftar, saya menyetujui{" "}
                <span className="text-[#2A629A] text-sm font-semibold">
                  Syarat dan Ketentuan{" "}
                </span>
                <span className="text-[#2A629A] text-sm">serta </span>
                <span className="text-[#2A629A] mb-3 text-sm font-semibold">
                  Kebijakan Privasi{" "}
                </span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
