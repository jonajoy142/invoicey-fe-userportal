// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { invoiceAPI, transactionAPI } from '@/lib/api';
import { Invoice, Transaction } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalInvoices: 0,
        totalAmount: 0,
        pendingAmount: 0,
        completedTransactions: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [invoicesData, transactionsData] = await Promise.all([
                    invoiceAPI.getInvoices(),
                    transactionAPI.getTransactions()
                ]);

                setInvoices(invoicesData);
                setTransactions(transactionsData);

                // Calculate stats
                const totalAmount = invoicesData.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
                const pendingAmount = invoicesData
                    .filter(inv => inv.status === 'pending')
                    .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
                const completedTransactions = transactionsData.filter(tx => tx.status === 'confirmed').length;

                setStats({
                    totalInvoices: invoicesData.length,
                    totalAmount,
                    pendingAmount,
                    completedTransactions
                });
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {user?.user_type === 'business'
                            ? 'Manage your invoices and track funding'
                            : 'Discover investment opportunities'
                        }
                    </p>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    {user?.user_type === 'business' ? (
                        <Link href="/dashboard/upload">
                            <Button>Upload Invoice</Button>
                        </Link>
                    ) : (
                        <Link href="/dashboard/browse">
                            <Button>Browse Invoices</Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm">📄</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        {user?.user_type === 'business' ? 'Total Invoices' : 'Investments'}
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">{stats.totalInvoices}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm">💰</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Amount</dt>
                                    <dd className="text-lg font-medium text-gray-900">{formatCurrency(stats.totalAmount)}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm">⏳</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Amount</dt>
                                    <dd className="text-lg font-medium text-gray-900">{formatCurrency(stats.pendingAmount)}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm">✅</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                                    <dd className="text-lg font-medium text-gray-900">{stats.completedTransactions}</dd>
                                </dl>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Recent Invoices */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                                {user?.user_type === 'business' ? 'Recent Invoices' : 'Recent Investments'}
                            </h3>
                            <Link href="/dashboard/invoices">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {invoices.slice(0, 5).map((invoice) => (
                                <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">#{invoice.invoice_number}</p>
                                        <p className="text-sm text-gray-500">{invoice.customer_name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{formatCurrency(parseFloat(invoice.amount))}</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                            {invoice.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {invoices.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    {user?.user_type === 'business'
                                        ? 'No invoices uploaded yet. Upload your first invoice to get started.'
                                        : 'No investments made yet. Browse available invoices to start investing.'
                                    }
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
                            <Link href="/dashboard/transactions">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {transactions.slice(0, 5).map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 capitalize">{transaction.transaction_type}</p>
                                        <p className="text-sm text-gray-500">
                                            {transaction.blockchain_tx_hash.substring(0, 10)}...
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{formatCurrency(transaction.amount)}</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {transactions.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    No transactions yet.
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {user?.user_type === 'business' ? (
                            <>
                                <Link href="/dashboard/upload">
                                    <Button variant="outline" className="w-full">
                                        📄 Upload Invoice
                                    </Button>
                                </Link>
                                <Link href="/dashboard/invoices">
                                    <Button variant="outline" className="w-full">
                                        📋 View Invoices
                                    </Button>
                                </Link>
                                <Link href="/dashboard/analytics">
                                    <Button variant="outline" className="w-full">
                                        📈 View Analytics
                                    </Button>
                                </Link>
                                <Link href="/dashboard/transactions">
                                    <Button variant="outline" className="w-full">
                                        💳 View Transactions
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/dashboard/browse">
                                    <Button variant="outline" className="w-full">
                                        🔍 Browse Invoices
                                    </Button>
                                </Link>
                                <Link href="/dashboard/investments">
                                    <Button variant="outline" className="w-full">
                                        💰 My Investments
                                    </Button>
                                </Link>
                                <Link href="/dashboard/portfolio">
                                    <Button variant="outline" className="w-full">
                                        📈 Portfolio
                                    </Button>
                                </Link>
                                <Link href="/dashboard/transactions">
                                    <Button variant="outline" className="w-full">
                                        💳 Transactions
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}