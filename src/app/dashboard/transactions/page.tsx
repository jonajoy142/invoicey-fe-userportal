// src/app/dashboard/transactions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { transactionAPI } from '@/lib/api';
import { Transaction } from '@/types';
import {
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle,
    XCircle,
    ExternalLink,
    Search,
    Filter,
    Download
} from 'lucide-react';
import { format } from 'date-fns';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await transactionAPI.getAll();
            setTransactions(data);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTransactionIcon = (type: string, status: string) => {
        if (status === 'completed') return <CheckCircle className="h-5 w-5 text-green-500" />;
        if (status === 'failed') return <XCircle className="h-5 w-5 text-red-500" />;
        if (status === 'pending') return <Clock className="h-5 w-5 text-yellow-500" />;

        return type === 'funding' ?
            <TrendingUp className="h-5 w-5 text-blue-500" /> :
            <TrendingDown className="h-5 w-5 text-purple-500" />;
    };

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'funding':
                return 'bg-blue-100 text-blue-800';
            case 'repayment':
                return 'bg-purple-100 text-purple-800';
            case 'fee':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.blockchain_tx_hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.id.toString().includes(searchTerm);
        const matchesType = typeFilter === 'all' || transaction.transaction_type.toLowerCase() === typeFilter.toLowerCase();
        const matchesStatus = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesType && matchesStatus;
    });

    // Calculate summary stats
    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const completedTransactions = transactions.filter(tx => tx.status === 'completed');
    const pendingTransactions = transactions.filter(tx => tx.status === 'pending');

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                    <p className="text-gray-600 mt-2">View all your transaction history</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Volume</p>
                                <p className="text-2xl font-bold">${totalAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold">{completedTransactions.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold">{pendingTransactions.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <TrendingDown className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                                <p className="text-2xl font-bold">{transactions.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by transaction ID or hash..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-400" />
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="all">All Types</option>
                                    <option value="funding">Funding</option>
                                    <option value="repayment">Repayment</option>
                                    <option value="fee">Fee</option>
                                </select>
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                                <option value="processing">Processing</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Transactions List */}
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredTransactions.length === 0 ? (
                        <div className="text-center py-12">
                            <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                            <p className="text-gray-500">
                                {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                                    ? 'No transactions match your current filters.'
                                    : 'Your transactions will appear here once you start trading.'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Transaction</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-900">Hash</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    {getTransactionIcon(transaction.transaction_type, transaction.status)}
                                                    <div>
                                                        <p className="font-medium">#{transaction.id}</p>
                                                        <p className="text-sm text-gray-500">Invoice #{transaction.invoice_id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge className={getTypeColor(transaction.transaction_type)}>
                                                    {transaction.transaction_type}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4">
                                                <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge className={getStatusColor(transaction.status)}>
                                                    {transaction.status}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4">
                                                <p className="text-sm">{format(new Date(transaction.created_at), 'MMM dd, yyyy')}</p>
                                                <p className="text-xs text-gray-500">{format(new Date(transaction.created_at), 'HH:mm')}</p>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-mono text-xs text-gray-600">
                                                        {transaction.blockchain_tx_hash.substring(0, 10)}...
                                                    </p>
                                                    <button className="text-gray-400 hover:text-gray-600">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}