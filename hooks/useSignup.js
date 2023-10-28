import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/userState';
import { alertActions } from '@/redux/AlertController';
import { useRouter } from 'next/router'


const useSignup = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const signup = async (username, email, password) => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await res.json();

            if (res.ok) {
                window.localStorage.setItem('user', JSON.stringify(json));
                dispatch(userActions.setUserData({ username: json.username, email: json.email, token: json.token }))
                router.push('/');
                // window.location.reload();
            } else {
                dispatch(alertActions.showAlert({ msg: json.message, showen: true, type: 'error' }));
            }
        } catch (err) {
            dispatch(alertActions.showAlert({ msg: err.message, showen: true, type: 'error' }));
        }
        setLoading(false)
    }

    return { loading, signup }
}

export default useSignup