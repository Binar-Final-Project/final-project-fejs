import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BiErrorCircle, BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUpdatePass } from "../../../redux/actions/auth/getPassActions";
import backgroundImage from "../../../assets/images/loginregister.png";
import { useMediaQuery } from "react-responsive";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import Footer from "../../../assets/components/navigations/Footer";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token").replace(/ /g, "+");
  console.log("Token: ", token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Kata sandi tidak cocok!", {
        icon: null,
        style: {
          background: "#FF0000 ",
          color: "#FFFFFF",
          borderRadius: "12px",
          fontSize: "14px",
          textAlign: "center",
          padding: "10px 20px",
        },
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    dispatch(getUpdatePass(password, confirmPassword, token, navigate));
  };

  const handleInput = (e) => {
    if (e) {
      if (e.target.id === "newPassword") {
        setPassword(e.target.value);
      }
      if (e.target.id === "confirmPassword") {
        setConfirmPassword(e.target.value);
      }
      setIsPasswordTouched(true);
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const newPasswordInputType = showNewPassword ? "text" : "password";
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password";

  const isPasswordValid =
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

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
          <div className="max-w-[400px] w-full rounded-lg p-5 sm:m-8 bg-[#FFF8ED] text-center shadow-lg relative">
            <BiArrowBack
              className="absolute top-4 left-4 cursor-pointer text-[#2A629A]"
              size={20}
              onClick={() => navigate("/forgot-password")}
            />
            <div className="max-w-[550px] mx-auto flex flex-col items-center mt-10">
              <h1 className="text-[#003285] text-2xl font-bold text-center w-full mb-10">
                Atur Ulang Kata Sandi
              </h1>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col space-y-1">
                    <label className="text-left text-[#2A629A] font-medium text-sm">
                      Masukkan Kata Sandi Baru
                    </label>
                    <div
                      className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg ${
                        password
                          ? isPasswordValid
                            ? "border-[#2A629A]"
                            : "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type={newPasswordInputType}
                        value={password}
                        onChange={handleInput}
                        id="newPassword"
                        placeholder="••••••••••"
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                        required
                      />
                      {showNewPassword ? (
                        <FiEye
                          className="text-gray-600 cursor-pointer"
                          onClick={toggleNewPasswordVisibility}
                        />
                      ) : (
                        <FiEyeOff
                          className="text-gray-600 cursor-pointer"
                          onClick={toggleNewPasswordVisibility}
                        />
                      )}
                    </div>
                    {isPasswordTouched && !isPasswordValid && (
                      <div className="flex items-center text-red-500 text-xs mt-1 text-left">
                        <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                        <p>
                          Kata sandi berisi minimal 8 karakter, termasuk huruf
                          besar dan angka
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-left text-[#2A629A] font-medium text-sm">
                      Ulangi Kata Sandi Baru
                    </label>
                    <div
                      className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg ${
                        confirmPassword
                          ? confirmPassword === password
                            ? "border-[#2A629A]"
                            : "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type={confirmPasswordInputType}
                        value={confirmPassword}
                        onChange={handleInput}
                        id="confirmPassword"
                        placeholder="••••••••••"
                        className="flex-grow bg-transparent border-none focus:outline-none text-sm text-[#2A629A]"
                        required
                      />
                      {showConfirmPassword ? (
                        <FiEye
                          className="text-gray-600 cursor-pointer"
                          onClick={toggleConfirmPasswordVisibility}
                        />
                      ) : (
                        <FiEyeOff
                          className="text-gray-600 cursor-pointer"
                          onClick={toggleConfirmPasswordVisibility}
                        />
                      )}
                    </div>
                    {confirmPassword && confirmPassword !== password && (
                      <div className="flex items-center text-red-500 text-xs mt-1 text-left">
                        <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                        <p>Kata Sandi tidak cocok.</p>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-[#2A629A] text-white font-medium text-sm p-2 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                    >
                      Atur Ulang
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isMobile ? "" : <BtnScrollTop />}
      <Footer />
    </div>
  );
};

export default ForgotPassword;
