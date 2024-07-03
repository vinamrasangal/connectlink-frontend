import { SIGNUP_USER, LOGIN_USER, LOGOUT, MOCK_LOGIN_USER } from "../actionType";

let initialState = {
    signUp: false,
    user: null,
    isAuthorized: false
};

// Retrieve user data from localStorage if available
if (typeof window !== 'undefined') {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    initialState.user = storedUser;
    initialState.isAuthorized = !!storedUser; // Check if user exists in localStorage
}

const authReducer = (state = initialState, action) => {
    let stateCopy = { ...state }; // Create a shallow copy of state

    switch (action.type) {
        case SIGNUP_USER:
            console.log(action.payload);
            return {
                ...stateCopy,
                signUp: true
            };
        case LOGIN_USER:
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('loginToken', action.payload.accessToken);
            localStorage.setItem('loginEmail', action.payload.user?.email);
            localStorage.setItem('name', action.payload.user.username);
            localStorage.setItem('profileComplete', action.payload.profile_complete);

            return {
                ...stateCopy,
                isAuthorized: true,
                user: action.payload.user
            };
        case LOGOUT:
            localStorage.removeItem('user');
            localStorage.removeItem('loginToken');
            localStorage.removeItem('loginEmail');
            localStorage.removeItem('name');
            localStorage.removeItem('profileComplete');

            return {
                ...stateCopy,
                isAuthorized: false,
                user: null
            };
        case MOCK_LOGIN_USER:
            localStorage.setItem('user', JSON.stringify(action.payload));
            localStorage.setItem('loginToken', action.payload.token);
            localStorage.setItem('loginEmail', action.payload.email);
            localStorage.setItem('name', action.payload.username);

            return {
                ...stateCopy,
                isAuthorized: true,
                user: action.payload
            };
        default:
            return stateCopy;
    }
};

export default authReducer;
