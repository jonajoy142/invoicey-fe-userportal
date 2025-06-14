// src/lib/api.ts
import axios from 'axios';
import type {
    User,
    UserCreate,
    LoginData,
    AuthResponse,
    Invoice,
    InvoiceCreate,
    Transaction,
    TransactionCreate
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    async signup(userData: UserCreate): Promise<User> {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    },

    async login(credentials: LoginData): Promise<AuthResponse> {
        const formData = new FormData();
        formData.append('username', credentials.email);
        formData.append('password', credentials.password);

        const response = await api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    },

    async getMe(): Promise<User> {
        const response = await api.get('/users/me');
        return response.data;
    },

    async updateMe(userData: Partial<User>): Promise<User> {
        const response = await api.put('/users/me', userData);
        return response.data;
    }
};

// Invoice API
export const invoiceAPI = {
    async createInvoice(invoiceData: InvoiceCreate): Promise<Invoice> {
        const response = await api.post('/invoices/', invoiceData);
        return response.data;
    },

    async getInvoices(): Promise<Invoice[]> {
        const response = await api.get('/invoices/');
        return response.data;
    },

    async getInvoice(invoiceId: number): Promise<Invoice> {
        const response = await api.get(`/invoices/${invoiceId}`);
        return response.data;
    }
};

// Transaction API
export const transactionAPI = {
    async createTransaction(transactionData: TransactionCreate): Promise<Transaction> {
        const response = await api.post('/transactions/', transactionData);
        return response.data;
    },

    async getTransactions(): Promise<Transaction[]> {
        const response = await api.get('/transactions/');
        return response.data;
    },

    async getTransaction(transactionId: number): Promise<Transaction> {
        const response = await api.get(`/transactions/${transactionId}`);
        return response.data;
    },

    async updateTransactionStatus(transactionId: number, status: string): Promise<Transaction> {
        const response = await api.put(`/transactions/${transactionId}/status`, { status });
        return response.data;
    }
};

// User API
export const userAPI = {
    async getUser(userId: string): Promise<User> {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    }
};