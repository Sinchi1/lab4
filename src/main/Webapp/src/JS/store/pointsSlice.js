import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pointsApi } from '../services/api';

const initialState = {
    points: [],
    loading: false,
    error: null,
    currentR: 2,
};

export const addPoint = createAsyncThunk(
    'points/add',
    async (data) => {
        const response = await pointsApi.addPoint(data);
        return response;
    }
);

export const fetchPoints = createAsyncThunk(
    'points/fetch',
    async () => {
        const response = await pointsApi.getPoints();
        return response;
    }
);

export const clearPoints = createAsyncThunk(
    'points/clear',
    async () => {
        await pointsApi.clearPoints();
    }
);

const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        setR: (state, action) => {
            state.currentR = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPoint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPoint.fulfilled, (state, action) => {
                state.loading = false;
                state.points.unshift(action.payload);
            })
            .addCase(addPoint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add point';
            })
            .addCase(fetchPoints.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPoints.fulfilled, (state, action) => {
                state.loading = false;
                state.points = action.payload;
            })
            .addCase(fetchPoints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch points';
            })
            .addCase(clearPoints.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearPoints.fulfilled, (state) => {
                state.loading = false;
                state.points = [];
            })
            .addCase(clearPoints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to clear points';
            });
    },
});

export const { setR, clearError } = pointsSlice.actions;
export default pointsSlice.reducer;
