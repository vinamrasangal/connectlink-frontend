import { createSlice } from '@reduxjs/toolkit';

export const createPostController = createSlice({
    name:'createPostController',
    initialState:{showen:false},
    reducers: {
        showCreatePost(state){
            state.showen = true
        },
        hideCreatePost(state){
            state.showen = false
        }
    }
}) 


export const CreatePostActions = createPostController.actions