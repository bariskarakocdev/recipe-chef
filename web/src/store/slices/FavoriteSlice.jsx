import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favorites: [],
}

export const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
        
    },
})

export const { } = FavoriteSlice.actions
export default FavoriteSlice.reducer