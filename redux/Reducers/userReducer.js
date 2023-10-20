import { EDIT_PROFILE, GET_PROFILE } from "../actionType";

let intialState = {
    profile:{}
}

export default function userReducer(state = intialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_PROFILE: 
            stateCopy.profile =  action.payload;
            localStorage.setItem("userId",action.payload._id)
            return stateCopy;
        case EDIT_PROFILE:
            const updatedProfile = { ...stateCopy.profile };
            for (const key in action.payload) {
                if (updatedProfile.hasOwnProperty(key)) {
                    updatedProfile[key] = action.payload[key];
                }
            }
            stateCopy.profile = updatedProfile;
            return stateCopy;
        default:
            return stateCopy;
    }
}
