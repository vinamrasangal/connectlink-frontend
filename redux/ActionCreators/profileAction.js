import { putApiCall, getApiCall } from "@/utils/request";
import {GET_PROFILE } from "../actionType";
import { returnErrors } from "./errorAction";

export const getProfile  = () => async (dispatch) => {
    try {
        const response = await getApiCall(`api/users`);
        console.log(response.data.user)
        if (response.data) {
            dispatch({ type: GET_PROFILE, payload: response.data.user });
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}