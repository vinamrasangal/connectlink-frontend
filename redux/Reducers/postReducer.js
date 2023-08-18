import { OPEN_POST, CLOSE_POST } from "../actionType";

let intialState = {
    isShow: false,
}

export default function postReducer(state = intialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case CLOSE_POST:
            stateCopy.isShow = false;
            return stateCopy;
        case OPEN_POST:
            stateCopy.isShow = true;
            return stateCopy;
        default:
            return stateCopy;
    }
}
