import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    email: string;
    access: string;
    refresh: string;
    isLoading: boolean;
}

const initialState = {
    isAuthenticated: false,
    email: '', // null
    access: '',
    refresh: '',
    isLoading: false,
} as AuthState;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            //console.log('ACTION in SETAUTH', action.payload)
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.access = action.payload.payload.access;
            state.refresh = action.payload.payload.refresh;
            state.isLoading = false
        },
        logout: state => {
            //console.log('LOGOUT in auth')
			state.isAuthenticated = false;
            state.email = '';
            state.access = '';
            state.refresh = '';
            state.isLoading = false;
		},
        setIsLoading: state => {
            state.isLoading = true;
        }
    }
})

export const { setAuth, logout, setIsLoading } = authSlice.actions;
export default authSlice.reducer;
