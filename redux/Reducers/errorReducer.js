import { GET_ERRORS, CLEAR_ERRORS } from "../actionType";

const intialState = {
    successMessageText: '',
    status: null,
    id: null,
    successMessage: false
};

export default function errorReducer(state = intialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_ERRORS:
            if (action.payload.status === 401) {
                // localStorage.clear();
                stateCopy.status = action.payload.status;
                // window.location.replace('/login');
            }
            else if (action.payload.status === 404) {
                stateCopy.successMessage = true;
                stateCopy.successMessageText = action.payload.msg || 'Something went wrong';
                stateCopy.status = action.payload.status;
            }
            else if (action.payload.status === 500) {
                stateCopy.successMessage = true;
                stateCopy.successMessageText = action.payload.msg;
                stateCopy.status = action.payload.status;
            }
            else if (action.payload.status === 200) {
                stateCopy.successEnable = true;
                stateCopy.successMessageText = action.payload.msg;
                stateCopy.status = action.payload.status;
            }
            else if (action.payload.status === 202) {
                stateCopy.successMessage = true;
                stateCopy.successMessageText = action.payload.msg;
                stateCopy.status = action.payload.status;
            }
            else if (action.payload.status === 425 || action.payload.status === 403) {
                stateCopy.successEnable = false;
                stateCopy.successMessageText = action.payload.msg;
                stateCopy.status = action.payload.status;
            }
            return stateCopy;
        case CLEAR_ERRORS:
            stateCopy.successMessage = false;
            stateCopy.successEnable = false;
            stateCopy.successMessageText = '';
            stateCopy.status = '';
            return stateCopy;
        default:
            return stateCopy;
    }
}