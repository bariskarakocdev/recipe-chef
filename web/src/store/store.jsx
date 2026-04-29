import { configureStore } from '@reduxjs/toolkit'
import AppReducer from './slices/AppSlice'
export const store = configureStore({
    reducer: {
        app: AppReducer,
    },
})