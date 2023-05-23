import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { alertController } from '@/redux/AlertController';
import { user } from '@/redux/User';
import { createPostController } from '@/redux/showCreatePost'; 
import { currentPage } from '@/redux/CurrentPage';

export const store = configureStore({
    reducer:{
        [alertController.name]:alertController.reducer,
        [user.name]:user.reducer,
        [createPostController.name]:createPostController.reducer,
        [currentPage.name]:currentPage.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});