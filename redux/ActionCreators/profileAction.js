import { putApiCall, getApiCall } from "@/utils/request";
import {GET_PROFILE,EDIT_PROFILE,RECOMMEND_USERS} from "../actionType";
import { returnErrors } from "./errorAction";

export const getProfile  = () => async (dispatch) => {
    try {
        const response = await getApiCall(`api/users/getProfile`);
        console.log(response.data)
        if (response.data) {
            dispatch({ type: GET_PROFILE, payload: response.data.user});
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}

export const editProfile  = (obj) => async (dispatch) => {
    try {
        const response = await putApiCall(`api/users/editProfile`,obj);
        console.log(response.data)
        if (response.data) {
            dispatch({ type:EDIT_PROFILE, payload: obj});
            returnErrors(dispatch, response.data.message, response.status)
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}

export const recommendUsers = () => async(dispatch) => {
    try {
        const response = await getApiCall(`api/users/recommended`);
        console.log(response.data)
        if (response.data) {
            dispatch({ type:RECOMMEND_USERS, payload:response.data});
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}


