import { GET_ERRORS, CLEAR_ERRORS } from "../actionType";

export const returnErrors = (dispatch, msg, status) => {
    return dispatch({ type: GET_ERRORS, payload: { msg, status } });
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};