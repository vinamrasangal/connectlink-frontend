
let intialState = {
    isAuthorized: false,
    user: typeof window !== "undefined" && window.localStorage.getItem('profileDetails'),
    succesMessage: false,
    isLoading: true
}

export default function userReducer(state = intialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        // case LOGIN_USER:
        //     stateCopy.isAuthorized = true;
        //     stateCopy.user = action.payload;
        //     localStorage.setItem('loginToken', action.payload.token);
        //     localStorage.setItem('loginEmail', action.payload.email);
        //     localStorage.setItem('name', action.payload.name);
        //     localStorage.setItem('profileDetails', JSON.stringify(action.payload));
        //     localStorage.setItem('profileComplete', action.payload.profile_complete)
        //     window.location.reload();
        //     return stateCopy;
        // case LOGIN_ERROR:
        //     stateCopy.succesMessage = true;
        //     stateCopy.succesMessageText = action.payload;
        //     return stateCopy;
        default:
            return stateCopy;
    }
}
