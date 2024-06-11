import axios from "axios";
import { setTicket } from "../../reducers/ticket/ticketReducers";

export const getTicket = (
    flight_id,
    total_adult,
    total_children,
    total_baby,
    orderer,
    passengers,
) =>
    async (dispatch) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_SERVER}/tickets`,
                {
                    flight_id,
                    total_adult,
                    total_children,
                    total_baby,
                    orderer,
                    passengers,
                },
                {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("response ticket", response.data);
            dispatch(setTicket(response?.data?.data));
        } catch (error) {
            console.log("Error during ticket retrieval ", error);
        }
    };