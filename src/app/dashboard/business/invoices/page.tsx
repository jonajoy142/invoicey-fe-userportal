'use client';

import React from 'react';
import {
    Upload,
    FileText,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    PlusCircle
} from 'lucide-react';
import Link from 'next/link';

interface StatCard {
    title: string;
    value: string;
    icon: React.ComponentType<any>;
    change?: string;
    changeType?: 'increase' | 'decrease';
    color: string;
}

interface Invoice {
    id: string;
    number: string;
    client: string;
    amount: number;
    status: 'pending' | 'funded' | 'paid' | 'overdue';
    dueDate: string;
    uploadDate: string;
}

interface Transaction {
    id: string;
    type: 'funding' | 'payment' | 'fee';
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    description: string;
}

// Mock data - replace with actual API calls
const mockStats: StatCard[] = [
    {
        title: 'Total Invoices',
        value: '24',
        icon: FileText,
        change: '+12%',
        changeType: 'increase',
        color: 'bg-blue-500'
    },
    {
        title: 'Total Funded',
        value: '$45,230',
        icon: DollarSign,
        change: '+8.2%',
        changeType: 'increase',
        color: 'bg-green-500'
    },
    {
        title: 'Pending Funding',
        value: '$12,400',
        icon: Clock,
        change: '-2.4%',
        changeType: 'decrease',
        color: 'bg-yellow-500'
    },
    {
        title: 'Success Rate',
        value: '92%',
        icon: TrendingUp,
        change: '+5.1%',
        changeType: 'increase',
        color: 'bg-purple-500'
    }
];

const mockInvoices: Invoice[] = [
    {
        id: '1',
        number: 'INV-001',
        client: 'Tech Corp Ltd',
        amount: 5000,
        status: 'funded',
        dueDate: '2024-07-15',
        uploadDate: '2024-06-20'
    },
    {
        id: '2',
        number: 'INV-002',
        client: 'Design Studio',
        amount: 3200,
        status: 'pending',
        dueDate: '2024-07-20',
        uploadDate: '2024-06-22'
    },
    {
        id: '3',
        number: 'INV-003',
        client: 'Marketing Inc',
        amount: 7500,
        status: 'paid',
        dueDate: '2024-07-10',
        uploadDate: '2024-06-18'
    }
];

const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'funding',
        amount: 4750,
        status: 'completed',
        date: '2024-06-21',
        description: 'Invoice INV-001 funded (95% of $5,000)'
    },
    {
        id: '2',
        type: 'payment',
        amount: 5000,
        status: 'completed',
        date: '2024-07-15',
        description: 'Payment received for INV-001'
    },
    {
        id: '3',
        type: 'fee',
        amount: -250,
        status: 'completed',
        date: '2024-07-15',
        description: 'Platform fee (5% of $5,000)'
    }
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'funded': return 'bg-green-100 text-green-800';
        case 'paid': return 'bg-blue-100 text-blue-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'overdue': return 'bg-red-100 text-red-800';
        case 'completed': return 'bg-green-100 text-green-800';
        case 'failed': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'funded':
        case 'paid':
        case 'completed':
            return <CheckCircle className="h-4 w-4" />;
        case 'pending':
            return <Clock className="h-4 w-4" />;
        case 'overdue':
        case 'failed':
            return <AlertCircle className="h-4 w-4" />;
        default:
            return null;
    }
};

export default function BusinessDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
                    <p className="text-gray-600">Manage your invoices and track funding</p>
                </div>
                <div className="flex space-x-3">
                    <Link
                        href="/dashboard/business/upload"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Upload Invoice
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockStats.map((stat, index) => (
                    <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                                        <stat.icon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            {stat.title}
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stat.value}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            {stat.change && (
                                <div className="mt-2">
                                    <div className={`flex items-center text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        <TrendingUp className={`h-4 w-4 mr-1 ${stat.changeType === 'decrease' ? 'transform rotate-180' : ''
                                            }`} />
                                        {stat.change} from last month
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/dashboard/business/upload"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                        <Upload className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Upload New Invoice</h3>
                            <p className="text-xs text-gray-500">Get instant funding</p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/business/invoices"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                        <FileText className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Manage Invoices</h3>
                            <p className="text-xs text-gray-500">View all invoices</p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/business/transactions"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                        <DollarSign className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">View Transactions</h3>
                            <p className="text-xs text-gray-500">Track payments</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Invoices & Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Invoices */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-900">Recent Invoices</h2>
                            <Link
                                href="/dashboard/business/invoices"
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                View all
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {mockInvoices.map((invoice) => (
                            <div key={invoice.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <p className="text-sm font-medium text-gray-900">
                                                {invoice.number}
                                            </p>
                                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                                {getStatusIcon(invoice.status)}
                                                <span className="ml-1">{invoice.status}</span>
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">{invoice.client}</p>
                                        <p className="text-xs text-gray-400">Due: {invoice.dueDate}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">
                                            ${invoice.amount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
                            <Link
                                href="/dashboard/business/transactions"
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                View all
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {mockTransactions.map((transaction) => (
                            <div key={transaction.id} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <p className="text-sm font-medium text-gray-900 capitalize">
                                                {transaction.type}
                                            </p>
                                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                {getStatusIcon(transaction.status)}
                                                <span className="ml-1">{transaction.status}</span>
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">{transaction.description}</p>
                                        <p className="text-xs text-gray-400">{transaction.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            ${transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}