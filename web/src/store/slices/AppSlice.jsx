import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_KEY;

const initialState = {
    foods: [],
    loading: false,
    currentRecipe: null,
    recipeLoading: false,
}

// Async işlem burada tanımlanır — reducer içinde değil!
export const getFoods = createAsyncThunk(
    'app/getFoods',
    async () => {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/random?number=12&apiKey=${API_KEY}`
        )
        console.log(response.data.recipes)
        return response.data.recipes;
    }
)

export const getRecipeDetails = createAsyncThunk(
    'app/getRecipeDetails',
    async (id) => {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
        );
        return response.data;
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

        // Recipe Details
        builder.addCase(getRecipeDetails.pending, (state) => {
            state.recipeLoading = true;
        })
        builder.addCase(getRecipeDetails.fulfilled, (state, action) => {
            state.currentRecipe = action.payload;
            state.recipeLoading = false;
        })
        builder.addCase(getRecipeDetails.rejected, (state) => {
            state.recipeLoading = false;
        })
    },
})

export const { } = appSlice.actions
export default appSlice.reducer