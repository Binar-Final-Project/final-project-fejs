import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getForgetPassAction } from "../../../redux/actions/auth/getPassActions";
import { RxCrossCircled } from "react-icons/rx";
import { BiSolidCheckCircle, BiArrowBack } from "react-icons/bi";
import backgroundImage from "../../../assets/images/loginregister.png";

const EmailResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Validasi email menggunakan regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(emailValue));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Harap masukkan email Anda terlebih dahulu", {
        icon: null,
        style: {
          background: "#FF0000",
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
    if (!isEmailValid) {
      toast.error("Mohon input Email dengan benar!", {
        icon: null,
        style: {
          icon:null,
          background: "#FF0000 ",
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

    // Kirim permintaan untuk reset password ke server
    dispatch(getForgetPassAction(email, navigate));
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
          <div className="max-w-[400px] w-full rounded-lg p-5 m-4 sm:m-8 bg-[#FFF8ED] text-center shadow-lg relative">
            <BiArrowBack
              className="absolute top-4 left-4 cursor-pointer text-[#2A629A]"
              size={20}
              onClick={() => navigate("/login")}
            />
            <div className="max-w-[550px] mx-auto flex flex-col items-center">
              <h1 className="text-[#003285] text-2xl font-bold text-center w-full mb-6">
                Forgot Password
              </h1>
              <p className="text-center mb-4 text-sm text-[#2A629A]">
                Masukkan email Anda untuk menerima tautan reset kata sandi
              </p>
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="flex flex-col space-y-1">
                  <label className="text-left text-[#2A629A] text-sm">
                    Email
                  </label>
                  <div
                    className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg ${
                      email
                        ? isEmailValid
                          ? "focus-within:border-[#2A629A]"
                          : "focus-within:border-red-500"
                        : "focus-within:border-[#2A629A]"
                    } ${
                      !isEmailValid && email
                        ? "border-red-500"
                        : "border-[#D0D0D0]"
                    }`}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="contoh@gmail.com"
                      className="w-full p-2 border-none bg-transparent outline-none text-sm text-[#2A629A]"
                      required
                    />
                    {isEmailValid && email && (
                      <BiSolidCheckCircle className="w-[21px] h-[21px] text-[#188E55]" />
                    )}
                    {!isEmailValid && email && (
                      <RxCrossCircled className="text-red-500 w-[20px] h-[20px] ml-2" />
                    )}
                  </div>
                  {!isEmailValid && email && (
                    <p className="text-red-500 text-xs mt-1 text-left">
                      Format Email tidak valid.
                    </p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-[#2A629A] text-white text-sm p-2 rounded-xl focus:outline-none w-full transition-colors duration-300 hover:bg-[#003285] active:bg-[#003285]"
                    onClick={handleSubmit}
                  >
                    Kirim
                  </button>
                </div>
              </form>
              <p className="text-[#2A629A] mt-7 mb-3 text-sm">
                Ingat kata sandi anda?{" "}
                <a
                  href="/login"
                  className="text-[#40A2E3] font-semibold text-sm"
                >
                  Login disini
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailResetPassword;
