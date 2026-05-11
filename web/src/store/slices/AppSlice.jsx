import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_KEY;

const initialState = {
    foods: [],
    loading: false,
    currentRecipe: null,
    recipeLoading: false,
    searchedFoodsByName: [],
    searchNameLoading: false,
    searchedFoodsByContent: [],
    searchContentLoading: false,
    searchedFoodsByCategory: [],
    searchCategoryLoading: false,
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

export const getRecipeDetails = createAsyncThunk(
    'app/getRecipeDetails',
    async (id) => {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
        );
        return response.data;
    }
)

export const searchFoodsByName = createAsyncThunk(
    'app/searchFoodsByName',
    async (query) => {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&number=12&apiKey=${API_KEY}`
        )
        return response.data.results;
    }
)

export const searchFoodsByContent = createAsyncThunk(
    'app/searchFoodsByContent',
    async (ingredients) => {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&addRecipeInformation=true&number=12&apiKey=${API_KEY}`
        )
        return response.data.results;
    }
)

export const searchFoodsByCategory = createAsyncThunk(
    'app/searchFoodsByCategory',
    async (category) => {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?type=${category}&addRecipeInformation=true&number=12&apiKey=${API_KEY}`
        )
        return response.data.results;
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

        // Search by Name
        builder.addCase(searchFoodsByName.pending, (state) => {
            state.searchNameLoading = true;
        })
        builder.addCase(searchFoodsByName.fulfilled, (state, action) => {
            state.searchedFoodsByName = action.payload;
            state.searchNameLoading = false;
        })
        builder.addCase(searchFoodsByName.rejected, (state) => {
            state.searchNameLoading = false;
        })

        // Search by Content
        builder.addCase(searchFoodsByContent.pending, (state) => {
            state.searchContentLoading = true;
        })
        builder.addCase(searchFoodsByContent.fulfilled, (state, action) => {
            state.searchedFoodsByContent = action.payload;
            state.searchContentLoading = false;
        })
        builder.addCase(searchFoodsByContent.rejected, (state) => {
            state.searchContentLoading = false;
        })

        // Search by Category
        builder.addCase(searchFoodsByCategory.pending, (state) => {
            state.searchCategoryLoading = true;
        })
        builder.addCase(searchFoodsByCategory.fulfilled, (state, action) => {
            state.searchedFoodsByCategory = action.payload;
            state.searchCategoryLoading = false;
        })
        builder.addCase(searchFoodsByCategory.rejected, (state) => {
            state.searchCategoryLoading = false;
        })
    },
})

export const { } = appSlice.actions
export default appSlice.reducer