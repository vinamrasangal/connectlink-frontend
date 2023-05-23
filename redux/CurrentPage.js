import { createSlice } from "@reduxjs/toolkit";

export const currentPage = createSlice({
    name:'currentPage',
    initialState:{page:''},
    reducers: {
        setPage(state,action){
            state.page = action.payload.page
        }
    }
})

export const currentPageAction = currentPage.actions