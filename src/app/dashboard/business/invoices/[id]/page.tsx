// src/app/dashboard/invoices/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Invoice, Transaction } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

import {
    ArrowLeft,
    FileText,
    DollarSign,
    Calendar,
    User,
    Mail,
    Hash,
    ExternalLink,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { format } from "date-fns";

interface Invoice {
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

interface Transaction {
    id: string;
    invoice_id: number;
    transaction_type: string;
    amount: number;
    status: string;
    blockchain_tx_hash: string;
    created_at: string;
}

const mockInvoices: Invoice[] = [
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

const mockTransactions: Transaction[] = [
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

export default function InvoiceDetailPage() {
    const params = useParams();
    const router = useRouter();

    const handleDelete = () => {
        const confirmed = confirm("Are you sure you want to delete this invoice?");
        if (!confirmed) return;

        // TODO: Replace with API call in real app
        alert("Invoice deleted (mock)");
        router.push("/dashboard/business/invoices");
    };

    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchInvoiceDetails();
            fetchTransactions();
        }
    }, [params.id]);

    const fetchInvoiceDetails = async () => {
        try {
            //const data = await invoiceAPI.getById(params.id as string);
            const found = mockInvoices.find(inv => inv.id === params.id);
            setInvoice(found ?? null);
            //setInvoice(found);
        } catch (error) {
            console.error("Failed to fetch invoice:", error);
        }
    };

    const fetchTransactions = async () => {
        try {
            //const data = await transactionAPI.getAll();
            const relatedTx = mockTransactions.filter(
                tx => tx.invoice_id === parseInt(params.id as string)
            );
            // Filter transactions for this invoice
            // const invoiceTransactions = data.filter(
            //     (tx: Transaction) => tx.invoice_id === parseInt(params.id as string),
            // );
            // setTransactions(invoiceTransactions);
            setTransactions(relatedTx);
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "approved":
                return "bg-green-100 text-green-800";
            case "funded":
                return "bg-blue-100 text-blue-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getTransactionIcon = (type: string, status: string) => {
        if (status === "completed")
            return <CheckCircle className="h-4 w-4 text-green-500" />;
        if (status === "failed")
            return <XCircle className="h-4 w-4 text-red-500" />;
        return <Clock className="h-4 w-4 text-yellow-500" />;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Invoice Not Found
                    </h1>
                    <Link href="/dashboard/invoices">
                        <Button>Back to Invoices</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {invoice.invoice_number}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Invoice details and transactions
                        </p>
                    </div>
                </div>
                <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Invoice Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Invoice Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Invoice Number
                                    </label>
                                    <p className="text-lg font-semibold">
                                        {invoice.invoice_number}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Amount
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                        <p className="text-lg font-semibold">
                                            {invoice.currency} {invoice.amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Due Date
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <p>{format(new Date(invoice.due_date), "MMMM dd, yyyy")}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Discount Rate
                                    </label>
                                    <p>{invoice.discount_rate}%</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Available Amount
                                    </label>
                                    <p className="text-lg font-semibold text-green-600">
                                        {invoice.currency}{" "}
                                        {invoice.available_amount.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Created
                                    </label>
                                    <p>
                                        {format(new Date(invoice.created_at), "MMM dd, yyyy HH:mm")}
                                    </p>
                                </div>
                            </div>

                            {/* Blockchain Information */}
                            {(invoice.token_id || invoice.contract_address) && (
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium mb-4">
                                        Blockchain Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {invoice.token_id && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Token ID
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <Hash className="h-4 w-4 text-gray-400" />
                                                    <p className="font-mono">{invoice.token_id}</p>
                                                </div>
                                            </div>
                                        )}
                                        {invoice.contract_address && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Contract Address
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-mono text-sm">
                                                        {invoice.contract_address}
                                                    </p>
                                                    <ExternalLink className="h-4 w-4 text-gray-400" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Transactions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {transactions.length === 0 ? (
                                <div className="text-center py-8">
                                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No transactions yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {transactions.map((transaction) => (
                                        <div key={transaction.id} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    {getTransactionIcon(
                                                        transaction.transaction_type,
                                                        transaction.status,
                                                    )}
                                                    <span className="font-medium capitalize">
                                                        {transaction.transaction_type}
                                                    </span>
                                                </div>
                                                <Badge className={getStatusColor(transaction.status)}>
                                                    {transaction.status}
                                                </Badge>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Amount:</span>
                                                    <p className="font-medium">
                                                        ${transaction.amount.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">TX Hash:</span>
                                                    <p className="font-mono text-xs">
                                                        {transaction.blockchain_tx_hash}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Date:</span>
                                                    <p>
                                                        {format(
                                                            new Date(transaction.created_at),
                                                            "MMM dd, HH:mm",
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Customer Information */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Customer Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <p className="font-medium">{invoice.customer_name}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <p>{invoice.customer_email}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {invoice.status === "pending" && (
                                <Button className="w-full" variant="secondary">
                                    Request Funding
                                </Button>
                            )}

                            {invoice.status === "approved" && (
                                <Button className="w-full">Accept Funding</Button>
                            )}

                            <Button variant="secondary" className="w-full">
                                Download Invoice
                            </Button>

                            <Button variant="secondary" className="w-full">
                                Contact Support
                            </Button>
                            {/* Edit & Delete Buttons */}

                            <Button
                                onClick={() => router.push(`/dashboard/business/invoices/${invoice.id}/edit`)}
                                className="w-full flex items-center gap-2"
                                variant="secondary"
                            >
                                <Pencil className="w-3 h-3" />
                                Edit Invoice
                            </Button>
                            <Button
                                onClick={handleDelete}
                                className="w-full flex items-center gap-2"
                                variant="destructive"
                            >
                                <Trash2 className="w-3 h-3" />
                                Delete Invoice
                            </Button>
                        </CardContent>



                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Days until due:</span>
                                <span className="font-medium">
                                    {Math.ceil(
                                        (new Date(invoice.due_date).getTime() -
                                            new Date().getTime()) /
                                        (1000 * 60 * 60 * 24),
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Funding ratio:</span>
                                <span className="font-medium">
                                    {((invoice.available_amount / invoice.amount) * 100).toFixed(
                                        1,
                                    )}
                                    %
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Transactions:</span>
                                <span className="font-medium">{transactions.length}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div >
        </div >
    );
}
