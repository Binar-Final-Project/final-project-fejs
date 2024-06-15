import axios from "axios";
import toast from "react-hot-toast";
import {
  setIsLoading,
  setNotifikasi,
  setUpdateNotifikasi,
} from "../../reducers/flight/notificationReducers";
import { setIsLoggedIn, setToken } from "../../reducers/auth/loginReducers";

export const getNotification = () => async (dispatch, getState) => {
  const { token } = getState().login;
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/notifications`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      dispatch(setNotifikasi(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
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

export const UpdateNotifications = (id) => async (dispatch, getState) => {
  const { token } = getState().login;
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_SERVER}/notifications/${id}`,
      null,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response update notif", response);
    if (response.status === 200) {
      dispatch(setUpdateNotifikasi(response?.data));
    }
  } catch (error) {
    console.log("error update notif", error);
  }
};

export const readAllNotifications = () => async (dispatch, getState) => {
  const { token } = getState().login;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/notifications/mark-all`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      dispatch(getNotification());
      toast("Semua notifikasi sudah dibaca!", {
        style: {
          background: "#28A745", // Background hijau
          color: "#FFFFFF",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
