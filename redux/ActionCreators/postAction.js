import { OPEN_POST, CLOSE_POST } from "../actionType";


export const closePost = () => async (dispatch) => {
    dispatch({ type: CLOSE_POST });
}


export const openPost = () => async (dispatch) => {
    dispatch({ type: OPEN_POST });
}
