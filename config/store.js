import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { alertController } from '@/redux/AlertController';
import { user } from '@/redux/User';

export const store = configureStore({
    reducer:{
        [alertController.name]:alertController.reducer,
        [user.name]:user.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});