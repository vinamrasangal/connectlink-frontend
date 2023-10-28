import { EDIT_PROFILE, GET_PROFILE, RECOMMEND_USERS, VIEW_PROFILE,FOLLOW_USER,UNFOLLOW_USER } from "../actionType";

let intialState = {
    profile:{},
    recommendUsers:[],
    viewProfile:{}
}

export default function userReducer(state = intialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_PROFILE: 
            stateCopy.profile =  action.payload;
            localStorage.setItem("userId",action.payload._id)
            return stateCopy;
        case VIEW_PROFILE: 
            stateCopy.viewProfile =  action.payload;
            // localStorage.setItem("userId",action.payload._id)
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
        case RECOMMEND_USERS:
            stateCopy.recommendUsers =  action.payload;
            return stateCopy;
        case FOLLOW_USER:
            return stateCopy;
        case UNFOLLOW_USER:
            return stateCopy;
        default:
            return stateCopy;
    }
}
