
import axios from 'axios';

const BASE_PATH = window.location.pathname.split('/')[1]; // Gets 'web-lab4'
const api = axios.create({
    baseURL: `/${BASE_PATH}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    login: async (data) => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    register: async (data) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
};

export const pointsApi = {
    addPoint: async (data) => {
        const response = await api.post('/points', data);
        return response.data;
    },

    getPoints: async () => {
        const response = await api.get('/points');
        return response.data;
    },

    clearPoints: async () => {
        await api.delete('/points');
    },
};

export default api;
