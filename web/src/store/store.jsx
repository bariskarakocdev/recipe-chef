import { configureStore } from '@reduxjs/toolkit'
import AppReducer from './slices/AppSlice'
import AuthReducer from './slices/AuthSlice'
import FavoriteReducer from './slices/FavoriteSlice'
export const store = configureStore({
    reducer: {
        app: AppReducer,
        auth: AuthReducer,
        favorite:FavoriteReducer
    },
})