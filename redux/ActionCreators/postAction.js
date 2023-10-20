import { getApiCall, postApiCall, putApiCall } from "@/utils/request";
import { OPEN_POST, CLOSE_POST, GET_ALL_POSTS, ADD_QUESTION, LIKEDISLIKE_POST, ADD_COMMENT } from "../actionType";
import { returnErrors } from "./errorAction";


export const closePost = () => async (dispatch) => {
    dispatch({ type: CLOSE_POST });
}


export const openPost = () => async (dispatch) => {
    dispatch({ type: OPEN_POST });
}


export const getPosts = (obj) => async (dispatch) => {
    try {
        const response = await getApiCall(`api/posts/all`);
        console.log(response.data)
        if (response.data) {
            dispatch({ type: GET_ALL_POSTS, payload: response.data.AllPost });
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

export const likeDislike = (postId,isLiked) => async (dispatch)=>{
    const obj = {postId}
    try{
        const response = await putApiCall(`api/posts/likedisikepost`,obj)
        console.log(response.data);
        if(response.data.success){
            dispatch({type:LIKEDISLIKE_POST, payload:{postId,isLiked}})
            returnErrors(dispatch, response.data.message, response.status)
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }  
    }catch(error){
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}


export const addComment = (postId,obj) => async (dispatch)=>{
    console.log(postId,obj);
    try{
        const response = await putApiCall(`api/posts/commentpost/${postId}`,obj)
        console.log(response.data);
        if(response.data.success){
            dispatch({type:ADD_COMMENT, payload:{obj,postId}})
            returnErrors(dispatch, response.data.message, response.status)
        }
        else {
            returnErrors(dispatch, response.data.message, response.status)
        }  
    }catch(error){
        returnErrors(dispatch, error.response?.data.message, error.response?.status)
    }
}

