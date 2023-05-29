import React, { useEffect, useState } from 'react';
import EditProfile from '@/components/EditProfile';
import { useDispatch } from 'react-redux';
import { currentPageAction } from '@/redux/CurrentPage';
import { auth } from '@/config/firebaseConfig';


const Profile = () => {
    
    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        dispatch(currentPageAction.setPage({page:'profile'}))
    },[])
    if(!auth.currentUser) return <></>
    return (
        <>
            <EditProfile />
        </>
    )
}

export default Profile