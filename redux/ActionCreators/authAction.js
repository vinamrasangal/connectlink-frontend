// import { postApiCall } from '@/utils/request';
// import { SIGNUP_USER, LOGIN_USER,LOGOUT } from "../actionType";
// import { returnErrors } from './errorAction';


// export const userSignup = (obj) => async (dispatch) => {
//     try {
//         const response = await postApiCall(`api/auth/register`, obj);
//         console.log(response.data)
//         if (response.data) {
//             dispatch({ type: SIGNUP_USER, payload: response.data });
//         }
//         else {
//             returnErrors(dispatch, response.data.message, response.status)
//         }
//     } catch (error) {
//         returnErrors(dispatch, error.response?.data.message, error.response?.status)
//     }
// }

// export const userLogin = (obj) => async (dispatch) => {
//     try {
//         const response = await postApiCall(`api/auth/login`, obj);
//         console.log(response.data)
//         if (response.data) {
//             dispatch({ type: LOGIN_USER, payload: response.data });
//         }
//         else {
//             returnErrors(dispatch, response.data.message, response.status)
//         }
//     } catch (error) {
//         returnErrors(dispatch, error.response?.data.message, error.response?.status)
//     }
// }

// export const logout = () => {
//     return { type: LOGOUT }
// }


import { postApiCall } from '@/utils/request';
import { SIGNUP_USER, LOGIN_USER, LOGOUT, MOCK_LOGIN_USER } from "../actionType";  // Import the new action type
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

export const mockUserLogin = () => (dispatch) => {  // Add this function
    const mockData = {
        username: 'devUser',
        email: 'dev@example.com',
        token: 'mockToken'
    };
    dispatch({ type: MOCK_LOGIN_USER, payload: mockData });
}

export const logout = () => {
    return { type: LOGOUT }
}
