import { SIGNUP_USER, LOGIN_USER, LOGOUT } from "../actionType";

let intialState = {
    signUp: false,
    user: typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')),
    isAuthorized: typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')) ? true : false
}

export default function authReducer(state = intialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SIGNUP_USER:
            console.log(action.payload)
            stateCopy.signUp = true;
            return stateCopy;
        case LOGIN_USER:
            stateCopy.isAuthorized = true;
            stateCopy.user = action.payload.user;
            localStorage.setItem('loginToken', action.payload.accesstoken);
            localStorage.setItem('loginEmail', action.payload.user?.email);
            localStorage.setItem('name', action.payload.user.username);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('profileComplete', action.payload.profile_complete)
            // window.location.reload();
            window.location.href = '/'
            return stateCopy;
        case LOGOUT:
            stateCopy.isAuthorized = false;
            stateCopy.user = null;
            return stateCopy;
        // case LOGIN_ERROR:
        //     stateCopy.succesMessage = true;
        //     stateCopy.succesMessageText = action.payload;
        //     return stateCopy;
        default:
            return stateCopy;
    }
}
