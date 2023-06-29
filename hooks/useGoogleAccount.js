import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/userState';

const useGoogleAccount = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [success,setSuccess] = useState(false)
    const dispatch = useDispatch()

    const continueWithGoogle = async (tokenResponse)=>{
        setError(null)
        setLoading(true)
        try {
            const TokenRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers : {
                    'Authorization': `Bearer ${tokenResponse.access_token}`
                }
            })
                const TokenJson = await TokenRes.json();
            //     const {email , given_name} = TokenJson;
            //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/google`,{
            //         method:'POST',
            //         body: JSON.stringify({email,username:given_name}),
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     })
            //     const json = await res.json();
            // if(res.ok){
            //     setSuccess(true)
            //     window.localStorage.setItem('user',JSON.stringify(json));
            //     dispatch(userActions.setUserData({username:json.username,email:json.email,token:json.token}))
            // }else {
            //     setError(json.message)
            // }
        }catch(err) {
            setError(err.message)
        }
        setLoading(false)
    }

    return {error,loading,success,continueWithGoogle}
}

export default useGoogleAccount