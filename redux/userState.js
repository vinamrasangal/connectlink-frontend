import { createSlice } from '@reduxjs/toolkit';

export const userController = createSlice({
    name:'userController',
    initialState:{user:null},
    reducers: {
        setUserData(state,action){
            state.user = {
                username:action.payload.username,
                email:action.payload.email,
                token:action.payload.token
            }
        },
        clearData(state,payload){
            state.user = null
        }
    }
}) 


export const userActions = userController.actions