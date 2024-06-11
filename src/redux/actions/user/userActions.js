import axios from "axios";
import toast from "react-hot-toast";
import { setIsLoading, setProfile } from "../../reducers/user/userReducers";
import { setIsLoggedIn, setToken } from "../../reducers/auth/loginReducers";

export const getUser = (navigate) => async (dispatch, getState) => {
  const { token } = getState().login;
  dispatch(setProfile([]));
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/users/profile`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("response", response);
    if (response?.data?.status === true) {
      dispatch(setProfile(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log("error", error);
    if (error?.response?.status === 401) {
      dispatch(setToken(null));
      dispatch(setIsLoggedIn(false));
    } else {
      toast("Terjadi kesalahan", {
        style: {
          background: "#FF0000",
          color: "#fff",
        },
      });
    }
  }
};

export const updateUser =
  (name, phone_number, navigate) => async (dispatch, getState) => {
    const { token } = getState().login;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/users/update-profile`,
        {
          name,
          phone_number,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response update profile", response);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/profil");
        }, 10);
        toast("Berhasil mengubah data Anda!", {
          style: {
            background: "#28A745", // Background hijau
            color: "#FFFFFF",
          },
        });
      }
    } catch (error) {
      console.log("error update profile", error);
      toast("Terjadi kesalahan", {
        style: {
          background: "#FF0000",
          color: "#fff",
        },
      });
    }
  };

export const updatePassword =
  (old_password, new_password, navigate) => async (dispatch, getState) => {
    const { token } = getState().login;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/users/update-password`,
        {
          old_password,
          new_password,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response update password", response);
      if (response.status === 200) {
        toast("Berhasil mengubah password Anda!", {
          style: {
            background: "#28A745", // Background hijau
            color: "#FFFFFF",
          },
        });
        return true;
      }
    } catch (error) {
      console.log("error update password", error);
      if (error?.response?.status === 400) {
        toast("Password lama yang Anda masukkan salah!", {
          style: {
            background: "#FF0000",
            color: "#fff",
          },
        });
      } else {
        toast("Terjadi kesalahan", {
          style: {
            background: "#FF0000",
            color: "#fff",
          },
        });
      }
    }
  };