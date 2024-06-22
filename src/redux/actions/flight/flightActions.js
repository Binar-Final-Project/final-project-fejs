import axios from "axios";
import {
  setCheapestFlights,
  setChoosenFlight,
  setFlights,
  setIsLoading,
  setPages,
} from "../../reducers/flight/flightReducers";
import toast from "react-hot-toast";

// Home Page Search Ticket
export const getFlight =
  (
    departure_code,
    arrival_code,
    departure_date,
    seat_class,
    total_passenger,
    filter,
    currentPage
  ) =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_SERVER
        }/flights?sort=${filter}&page=${currentPage}`,
        {
          departure_code,
          arrival_code,
          departure_date,
          seat_class,
          total_passenger,
          filter,
          currentPage,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response.data", response.data.data.flights);
      dispatch(setPages(response?.data?.data?.total_page));
      dispatch(setFlights(response?.data?.data?.flights));
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log("Error Search Ticket Home Page", error);
      if (error?.response?.status === 400) {
        dispatch(setFlights([]));
        dispatch(setIsLoading(false));
        dispatch(setChoosenFlight([]));
        return false;
      } else {
        dispatch(setFlights([]));
        dispatch(setIsLoading(false));
        dispatch(setChoosenFlight([]));
        toast("Terjadi Kesalahan", {
          style: {
            background: "#FF0000", // Background merah
            color: "#FFFFFF",
            textAlign: "center", // Posisi teks di tengah
          },
        });
      }
    }
  };

export const getCheapestFlights = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_SERVER}/flights/cheapest`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (response?.status === 200) {
      dispatch(setCheapestFlights(response?.data?.data));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log("error", error);
    dispatch(setIsLoading(false));
  }
};
