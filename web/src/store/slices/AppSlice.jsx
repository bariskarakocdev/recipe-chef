import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_KEY;

const initialState = {
    foods: [],
    loading: false,
}

// Async işlem burada tanımlanır — reducer içinde değil!
export const getFoods = createAsyncThunk(
    'app/getFoods',
    async () => {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/random?number=12&apiKey=${API_KEY}`
        )
        return response.data.recipes;
    }
)

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getFoods.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getFoods.fulfilled, (state, action) => {
            state.foods = action.payload;
            state.loading = false;
        })
        builder.addCase(getFoods.rejected, (state) => {
            state.loading = false;
        })
    },
})

export const {} = appSlice.actions
export default appSlice.reducer