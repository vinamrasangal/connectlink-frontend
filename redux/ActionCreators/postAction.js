import { getApiCall, postApiCall, } from "@/utils/request";
import { OPEN_POST, CLOSE_POST, GET_ALL_POSTS, ADD_QUESTION } from "../actionType";
import { returnErrors } from "./errorAction";


export const closePost = () => async (dispatch) => {
    dispatch({ type: CLOSE_POST });
}


export const openPost = () => async (dispatch) => {
    dispatch({ type: OPEN_POST });
}


export const getPosts = (obj) => async (dispatch) => {
    try {
        const response = await getApiCall(`api/posts/timeline/all`);
        console.log(response.data)
        if (response.data) {
            dispatch({ type: GET_ALL_POSTS, payload: response.data });
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}

export const addQuestion = (obj) => async (dispatch) => {
    try {
        const response = await postApiCall(`api/posts/createpost/ask`, obj);
        console.log(response.data)
        if (response.data.success) {
            dispatch({ type: ADD_QUESTION, payload: response.data });
            returnErrors(dispatch, response.data.message, response.status)
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}

export const addDiscussion = (obj) => async (dispatch) => {
    try {
        const response = await postApiCall(`api/posts/createpost/discuss`, obj);
        console.log(response.data)
        if (response.data.success) {
            // dispatch({ type: ADD_QUESTION, payload: response.data });
            returnErrors(dispatch, response.data.message, response.status)
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }
    } catch (error) {
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}