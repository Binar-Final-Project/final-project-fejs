import axios from "axios";
import toast from "react-hot-toast";
import {
  setIsLoading,
  setTransactions,
} from "../../reducers/flight/transactionReducers";
import { setIsLoggedIn, setToken } from "../../reducers/auth/loginReducers";

export const getTransactions = (lt, gte, q) => async (dispatch, getState) => {
  const { token } = getState().login;
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_SERVER
      }/transactions/history?lt=${lt}&gte=${gte}&q=${q}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(setTransactions(response?.data?.data));
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
    dispatch(setIsLoading(false));
  }
};

export const printTransactions = (id) => async (dispatch, getState) => {
  const { token } = getState().login;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/transactions/${id}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response print", response);
  } catch (error) {
    console.log("error print", error);
  }
};

export const cancelTransactions =
  (bookingCode, navigate) => async (dispatch, getState) => {
    const { token } = getState().login;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_SERVER}/transactions/${bookingCode}`,
        { bookingCode },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response cancel", response);
      if (response?.status === 200) {
        toast(response?.data?.message, {
          style: {
            background: "#28A745", // Background hijau
            color: "#FFFFFF",
          },
        });
      }
    } catch (error) {
      console.log("error cancel", error);
      toast(error?.response?.data?.message, {
        style: {
          background: "#FF0000",
          color: "#fff",
        },
      });
    }
  };
