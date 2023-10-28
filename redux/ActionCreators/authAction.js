import { postApiCall } from '@/utils/request';
import { SIGNUP_USER, LOGIN_USER,LOGOUT } from "../actionType";
import { returnErrors } from './errorAction';


export const userSignup = (obj) => async (dispatch) => {
    try {
        const response = await postApiCall(`api/auth/register`, obj);
        console.log(response.data)
        if (response.data) {
            dispatch({ type: SIGNUP_USER, payload: response.data });
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}

export const userLogin = (obj) => async (dispatch) => {
    try {
        const response = await postApiCall(`api/auth/login`, obj);
        console.log(response.data)
        if (response.data) {
            dispatch({ type: LOGIN_USER, payload: response.data });
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}

export const logout = () => {
    return { type: LOGOUT }
}