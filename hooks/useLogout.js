import React from 'react'
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/userState';
import { alertActions } from '@/redux/AlertController';

const useLogout = () => {
    const dispatch = useDispatch()
    const logout = () => {
        window.localStorage.setItem('user',null)
        dispatch(userActions.clearData({}))
        dispatch(alertActions.showAlert({msg:'logged out successfully',type:'success'}));
    }

    return {logout}
}

export default useLogout