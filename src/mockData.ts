// Define interfaces
export interface Invoice {
    id: string;
    invoice_number: string;
    customer_name: string;
    customer_email: string;
    amount: number;
    available_amount: number;
    currency: string;
    discount_rate: number;
    due_date: string;
    created_at: string;
    status: string;
    contract_address?: string;
    token_id?: string;
}

export interface Transaction {
    id: string;
    invoice_id: number;
    transaction_type: string;
    amount: number;
    status: string;
    blockchain_tx_hash: string;
    created_at: string;
}

// Mock data for invoices
export const mockInvoices: Invoice[] = [
    {
        id: "1",
        invoice_number: "INV-001",
        customer_name: "Tech Corp Ltd",
        customer_email: "info@techcorp.com",
        amount: 5000,
        available_amount: 4500,
        currency: "USD",
        discount_rate: 2,
        due_date: "2024-07-15",
        created_at: "2024-06-20",
        status: "funded",
    },
    {
        id: "2",
        invoice_number: "INV-002",
        customer_name: "Design Studio",
        customer_email: "hello@designstudio.com",
        amount: 3200,
        available_amount: 3000,
        currency: "USD",
        discount_rate: 1.5,
        due_date: "2024-07-20",
        created_at: "2024-06-22",
        status: "pending",
    },
    {
        id: "3",
        invoice_number: "INV-003",
        customer_name: "Marketing Inc",
        customer_email: "contact@marketinginc.com",
        amount: 7500,
        available_amount: 7500,
        currency: "USD",
        discount_rate: 1.2,
        due_date: "2024-07-10",
        created_at: "2024-06-18",
        status: "paid",
    },
];

// Mock data for transactions
export const mockTransactions: Transaction[] = [
    {
        id: "tx1",
        invoice_id: 1,
        transaction_type: "payment",
        amount: 3000,
        status: "completed",
        blockchain_tx_hash: "0xabc123",
        created_at: "2024-06-21T10:30:00Z",
    },
    {
        id: "tx2",
        invoice_id: 1,
        transaction_type: "funding",
        amount: 1500,
        status: "pending",
        blockchain_tx_hash: "0xdef456",
        created_at: "2024-06-22T12:00:00Z",
    },
];
