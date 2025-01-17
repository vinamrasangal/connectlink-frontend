import { putApiCall, getApiCall } from "@/utils/request";
import {GET_PROFILE,EDIT_PROFILE,RECOMMEND_USERS, VIEW_PROFILE,FOLLOW_USER,UNFOLLOW_USER} from "../actionType";
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
export const viewProfile  = (id) => async (dispatch) => {
    try {
        const response = await getApiCall(`api/users/${id}/getUser`);
        console.log(response.data)
        if (response.data) {
            dispatch({ type: VIEW_PROFILE, payload: response.data.user});
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
export const followUser = (targetId) => async(dispatch) => {
    try {
        const response = await putApiCall(`api/users/${targetId}/follow`);
        console.log(response.data)
        if (response.data) {
            dispatch({ type:FOLLOW_USER, payload:response.data});
            returnErrors(dispatch, response.data.message, response.status)
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}
export const unfollowUser = (targetId) => async(dispatch) => {
    try {
        const response = await putApiCall(`api/users/${targetId}/unfollow`);
        console.log(response.data)
        if (response.data) {
            dispatch({ type:UNFOLLOW_USER, payload:response.data});
            returnErrors(dispatch, response.data.message, response.status)
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}


