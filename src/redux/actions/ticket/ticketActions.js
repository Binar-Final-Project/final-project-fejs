import axios from "axios";
import { setTicket } from "../../reducers/ticket/ticketReducers";

export const getTicket = (
    flights,
    total_adult,
    total_children,
    total_baby,
    orderer,
    passengers,
) =>
    async (dispatch, getState) => {
        try {
            const { token } = getState().login;
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_SERVER}/tickets`,
                {
                    flights,
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
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("response ticket", response.data);
            dispatch(setTicket(response?.data?.data));
            return response.data;
        } catch (error) {
            console.log("Error during ticket retrieval ", error);
        }
    };