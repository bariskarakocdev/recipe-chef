import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../../services/firebase'

const initialState = {
    favorites: [], // HATA BURADAYDI, boş dizi olmalı.
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

        // Kullanıcı daha önce hiç favori eklemediyse belgeyi oluştur
        if (!docSnap.exists()) {
            await setDoc(userDocRef, { favorites: [] });
        }

        if (isAdding) {
            await updateDoc(userDocRef, {
                favorites: arrayUnion(recipe)
            });
            return { recipe, isAdding: true };
        } else {
            await updateDoc(userDocRef, {
                favorites: arrayRemove(recipe)
            });
            return { recipe, isAdding: false };
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
        // 2. EXTRA REDUCERS (Asenkron işlemin sonucunu dinleme)
        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload; 
        });
        
        builder.addCase(toggleFavorite.fulfilled, (state, action) => {
            const { recipe, isAdding } = action.payload;
            if (isAdding) {
                // Eklendiyse listeye koy
                state.favorites.push(recipe);
            } else {
                // Çıkarıldıysa listeden sil
                state.favorites = state.favorites.filter(item => item.id !== recipe.id);
            }
        });
    },
})

export const { clearFavorites } = FavoriteSlice.actions
export default FavoriteSlice.reducer