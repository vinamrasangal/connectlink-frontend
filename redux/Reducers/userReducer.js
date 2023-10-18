import { GET_PROFILE } from "../actionType";

let intialState = {
    profile:{}
}

export default function userReducer(state = intialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_PROFILE: 
            stateCopy.profile =  action.payload;
        default:
            return stateCopy;
    }
}
