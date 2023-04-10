import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
    name:'user',
    initialState: {isLoggedIN:false,rememberMe:false,userData:null},
    reducers: {
        setUser(state,action) {
            state.isLoggedIN = action.payload.isLoggedIN
            state.userData = action.payload.userData
            state.rememberMe = action.payload.rememberMe
        }
    }
})


export const userAction = user.actions