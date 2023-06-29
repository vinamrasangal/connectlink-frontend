import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { alertController } from '@/redux/AlertController';
import { createPostController } from '@/redux/showCreatePost'; 
import { currentPage } from '@/redux/CurrentPage';
import { userController } from '@/redux/userState';

export const store = configureStore({
    reducer:{
        [alertController.name]:alertController.reducer,
        [createPostController.name]:createPostController.reducer,
        [currentPage.name]:currentPage.reducer,
        [userController.name]:userController.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});