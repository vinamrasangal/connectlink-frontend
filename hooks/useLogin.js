import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/userState';
import { alertActions } from '@/redux/AlertController';

const useLogin = () => {
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch()

    const login = async (email,password,rememberMe)=>{
        setError(null)
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,{
                method:'POST',
                body: JSON.stringify({email,password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await res.json();

            if(res.ok){
                if(rememberMe){
                    window.localStorage.setItem('user',JSON.stringify(json));
                }
                dispatch(alertActions.showAlert({msg:'logged in successfully',showen:true,type:'success'}))
                dispatch(userActions.setUserData({username:json.username,email:json.email,token:json.token}))
            }else {
                dispatch(alertActions.showAlert({msg:json.message,showen:true,type:'error'}));
            }
        }catch(err){
            dispatch(alertActions.showAlert({msg:err.message,showen:true,type:'error'}));
        }
        setLoading(false)
    }

    return {loading,login}
}

export default useLogin