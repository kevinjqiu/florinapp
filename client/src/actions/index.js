import axios from "axios"
import * as actionTypes from "./types";

export const fetchAccounts = () => async dispatch => {
    const res = await axios.get("/api/v2/accounts")
    return dispatch({
        type: actionTypes.FETCH_ACCOUNTS,
        payload: res.data.result
    });
}