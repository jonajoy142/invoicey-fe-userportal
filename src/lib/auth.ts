import { api } from './api';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    role: 'business' | 'investor';
    company_name?: string;
    first_name?: string;
    last_name?: string;
}

export const authService = {
    async login(data: LoginData) {
        const response = await api.post('/auth/login', data);
        const { access_token, user } = response.data;
        localStorage.setItem('token', access_token);
        return { token: access_token, user };
    },

    async register(data: RegisterData) {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    async getMe() {
        const response = await api.get('/auth/me');
        return response.data;
    },

    async updateProfile(data: any) {
        const response = await api.put('/users/me', data);
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
};