import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    user: null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { setLogin, setUser } = AuthSlice.actions
export default AuthSlice.reducer