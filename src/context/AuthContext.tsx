// src/contexts/AuthContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/lib/auth';
import type { LoginData, RegisterData } from '@/lib/auth';

interface AuthContextType {
    user: any | null;
    loading: boolean;
    login: (credentials: LoginData) => Promise<void>;
    signup: (userData: UserCreate) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (token) {
                    const userData = await authAPI.getMe();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Auth initialization failed:', error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginData) => {
        try {
            const response = await authAPI.login(credentials);

            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const signup = async (userData: UserCreate) => {
        try {
            const newUser = await authAPI.signup(userData);
            // After signup, you might want to automatically log them in
            // or redirect to login page
            return newUser;
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    const updateUser = async (userData: Partial<User>) => {
        try {
            const updatedUser = await authAPI.updateMe(userData);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Update user failed:', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateUser,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}