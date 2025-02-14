import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authApi } from '../services/api';

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await authApi.login(data);
            localStorage.setItem('token', response.token);
            return response;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue('Authentication failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const response = await authApi.register(data);
            localStorage.setItem('token', response.token);
            return response;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue('Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.error = null;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
        updateToken: (state) => {
            state.token = localStorage.getItem('token');
        }
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            });
    }
});

export const { logout, clearError,updateToken  } = authSlice.actions;
export default authSlice.reducer;
