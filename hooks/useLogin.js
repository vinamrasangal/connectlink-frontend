import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/userState';
import { alertActions } from '@/redux/AlertController';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const login = async (email, password, rememberMe) => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();
            console.log(json);
            if (res.ok) {
                if (rememberMe) {
                    window.localStorage.setItem('user', JSON.stringify(json));
                }
                dispatch(alertActions.showAlert({ msg: 'Logged in successfully', showen: true, type: 'success' }));
                dispatch(userActions.setUserData({ username: json.username, email: json.email, token: json.token }));
            } else {
                // Handle error response
                dispatch(alertActions.showAlert({ msg: json.message || 'Login failed', showen: true, type: 'error' }));
            }
        } catch (err) {
            // Handle fetch error
            dispatch(alertActions.showAlert({ msg: err.message || 'Failed to connect to the server', showen: true, type: 'error' }));
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
