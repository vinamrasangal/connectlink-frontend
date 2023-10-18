import { OPEN_POST, CLOSE_POST, GET_ALL_POSTS , LIKEDISLIKE_POST, ADD_COMMENT } from "../actionType";

let intialState = {
    isShow: false,
    allPosts:{},
}

export default function postReducer(state = intialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_ALL_POSTS:
            stateCopy.allPosts = action.payload;
        case CLOSE_POST:
            stateCopy.isShow = false;
            return stateCopy;
        case OPEN_POST:
            stateCopy.isShow = true;
            return stateCopy;
        case LIKEDISLIKE_POST:
            stateCopy.allPosts.AllPost.forEach(element => {
                if(element._id === action.payload){
                    element.isLike  === true;
                }
            });
            return stateCopy;
        case ADD_COMMENT:
            return stateCopy
        default:
            return stateCopy;
    }
}
