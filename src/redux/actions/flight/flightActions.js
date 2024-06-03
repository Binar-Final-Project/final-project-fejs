import axios from "axios";
import { setFlights } from "../../reducers/flight/flightReducers";

// Home Page Search Ticket
export const getFlight =
  (
    departure_code,
    arrival_code,
    departure_date,
    // return_date,
    seat_class,
    total_passenger
  ) =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER}/flights`,
        {
          departure_code,
          arrival_code,
          departure_date,
          // return_date,
          seat_class,
          total_passenger,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response flight", response.data);
      dispatch(setFlights(response?.data?.data));
    } catch (error) {
      console.log("Error Search Ticket Home Page", error);
    }
  };
