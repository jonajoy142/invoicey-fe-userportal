// src/types/index.ts

export interface User {
    id: string;
    email: string;
    wallet_address: string;
    user_type: 'business' | 'investor';
    business_name?: string;
    created_at: string;
    kyc_status: 'pending' | 'approved' | 'rejected';
}

export interface UserCreate {
    email: string;
    password: string;
    wallet_address: string;
    user_type: 'business' | 'investor';
    business_name?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface Invoice {
    id: number;
    invoice_number: string;
    amount: string;
    currency: string;
    due_date: string;
    discount_rate: string;
    customer_name: string;
    customer_email: string;
    seller_id: string;
    status: 'pending' | 'approved' | 'funded' | 'completed' | 'rejected';
    token_id?: number;
    contract_address?: string;
    available_amount: string;
    created_at: string;
    updated_at: string;
}

export interface InvoiceCreate {
    invoice_number: string;
    amount: string;
    currency?: string;
    due_date: string;
    discount_rate: string;
    customer_name: string;
    customer_email: string;
}

export interface Transaction {
    id: number;
    invoice_id: number;
    investor_id: string;
    amount: number;
    transaction_type: 'investment' | 'repayment' | 'fee';
    blockchain_tx_hash: string;
    status: 'pending' | 'confirmed' | 'failed';
    block_number?: number;
    created_at: string;
    updated_at: string;
}

export interface TransactionCreate {
    invoice_id: number;
    amount: number;
    transaction_type: string;
    blockchain_tx_hash: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}