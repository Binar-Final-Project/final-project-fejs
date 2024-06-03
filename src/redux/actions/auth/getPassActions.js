import toast from "react-hot-toast";
import axios from "axios";

export const getForgetPassAction = (email, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER}/users/sent-forgot-password`,
      {
        email: email,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (response.data.status === true) {
      toast.success("Email berhasil dikirim!", {
        style: {
          background: "#4BB543",
          color: "#FFFFFF",
          borderRadius: "12px",
          fontSize: "14px",
          textAlign: "center",
          padding: "10px 20px",
        },
        position: "bottom-center",
        duration: 4000,
      });
      setTimeout(() => {
        //   window.location.href = "https://mail.google.com";
        navigate("/reset-password");
      }, 3000);
    }
  } catch (error) {
    console.log("error", error);
    if (error.response.data.message === "User not found or not verified") {
      toast.error("User tidak ditemukan", {
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
    } else if (error.response.data.message === "Email is invalid") {
      toast.error("Email tidak valid", {
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
    }
  }
};

export const getUpdatePass =
  (password1, password2, token, navigate) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/users/reset-password`,
        {
          password1: password1,
          password2: password2,
          token: token,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.status === true) {
        toast.success("Kata sandi berhasil direset!", {
          style: {
            background: "#4BB543",
            color: "#FFFFFF",
            borderRadius: "12px",
            fontSize: "14px",
            textAlign: "center",
            padding: "10px 20px",
          },
          position: "bottom-center",
          duration: 4000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log("error ", error);
      if (error.response.data.message === "Password or token not sent") {
        toast.error("Password tidak terkirim", {
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
      } else if (error.response.data.message === "Password do not match") {
        toast.error("Password tidak sama", {
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
      }
    }
  };
