import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { toast } from 'react-toastify'

const initialState = {
    favorites: [], // HATA BURADAYDI, boş dizi olmalı.
}

// Sadece gerekli alanları kaydet — Firestore belge boyutu sorununu önler
function simplifyRecipe(recipe) {
    return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image || '',
        readyInMinutes: recipe.readyInMinutes || 0,
        servings: recipe.servings || 0,
        healthScore: recipe.healthScore || 0,
        summary: (recipe.summary || '').substring(0, 500),
        extendedIngredients: (recipe.extendedIngredients || []).map(ing => ({
            name: ing.name,
            original: ing.original,
        })),
    };
}

// 1. FETCH FAVORITES (Favorileri Veritabanından Getirme)
export const fetchFavorites = createAsyncThunk(
    'favorite/fetchFavorites',
    async (userId) => {
        const userDocRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userDocRef);

        // Eğer belge varsa ve içinde "favorites" dizisi varsa o diziyi döndür
        if (docSnap.exists() && docSnap.data().favorites) {
            return docSnap.data().favorites;
        }
        
        // Yoksa boş dizi döndür
        return [];
    }
)

// 2. TOGGLE FAVORITE (Favorilere Ekleme ve Çıkarma)
export const toggleFavorite = createAsyncThunk(
    'favorite/toggleFavorite',
    async ({ recipe, userId, isAdding }) => {
        const userDocRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userDocRef);

        // Sadece gerekli alanları sakla
        const simpleRecipe = simplifyRecipe(recipe);

        // Kullanıcı daha önce hiç favori eklemediyse belgeyi oluştur
        if (!docSnap.exists()) {
            await setDoc(userDocRef, { favorites: [] });
        }

        if (isAdding) {
            await updateDoc(userDocRef, {
                favorites: arrayUnion(simpleRecipe)
            });
            return { recipe: simpleRecipe, isAdding: true };
        } else {
            // arrayRemove tam eşleşme gerektirir — mevcut listeyi filtrele
            const currentFavorites = docSnap.exists() ? (docSnap.data().favorites || []) : [];
            const updatedFavorites = currentFavorites.filter(fav => fav.id !== recipe.id);
            await updateDoc(userDocRef, { favorites: updatedFavorites });
            return { recipe: simpleRecipe, isAdding: false };
        }
    }
)

export const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        clearFavorites: (state) => {
            state.favorites = [];
        }
    },
    extraReducers: (builder) => {
        // FETCH FAVORITES
        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload; 
        });
        builder.addCase(fetchFavorites.rejected, (state, action) => {
            console.error("Favorileri getirme hatası:", action.error.message);
        });
        
        // TOGGLE FAVORITE
        builder.addCase(toggleFavorite.fulfilled, (state, action) => {
            const { recipe, isAdding } = action.payload;
            if (isAdding) {
                // Eklendiyse listeye koy
                state.favorites.push(recipe);
                toast.success("Favorilere eklendi! ❤️");
            } else {
                // Çıkarıldıysa listeden sil
                state.favorites = state.favorites.filter(item => item.id !== recipe.id);
                toast.info("Favorilerden çıkarıldı.");
            }
        });
        builder.addCase(toggleFavorite.rejected, (state, action) => {
            console.error("Favori işlemi hatası:", action.error.message);
            toast.error("Favori işlemi başarısız: " + action.error.message);
        });
    },
})

export const { clearFavorites } = FavoriteSlice.actions
export default FavoriteSlice.reducer