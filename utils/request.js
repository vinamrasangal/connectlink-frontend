import axios from "axios";
const token = typeof window !== 'undefined' && window.localStorage.getItem("loginToken")
const AuthStr = "Bearer " + token;
// const AuthStr = "Bearer " + admintoken;

function getApiCall(url) {
    return axios
        .get(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
            headers: { Authorization: AuthStr },
        })
        .then((data) => {
            return data;
        });
}

function postApiCall(url, body) {
    return axios
        .post(process.env.NEXT_PUBLIC_API_BASE_URL + url, body, {
            headers: { Authorization: AuthStr },
        })
        .then((data) => {
            return data;
        });
}

function putApiCall(url, body) {
    return axios
        .put(process.env.NEXT_PUBLIC_API_BASE_URL + url, body, {
            headers: { Authorization: AuthStr },
        })
        .then((data) => {
            return data;
        });
}

function deleteApiCall(url, body) {
    return axios.delete(process.env.REACT_APP_API_KEY + url, {
        headers: { Authorization: AuthStr},
        data: body
    }).then((data) => {
        return data;
    });
}
function previewCall(url, body) {
    return axios
        .post(url, body, {
            dataType: "jsonp",
            contentType: "application/json",
            //headers: { Authorization: AuthStr },
        })
        .then((data) => {
            return data;
        });
}

export { getApiCall, postApiCall, previewCall, deleteApiCall, putApiCall };
