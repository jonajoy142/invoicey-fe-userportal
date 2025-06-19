// src/app/dashboard/invoices/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { invoiceAPI } from '@/lib/api';
import { Invoice } from '@/types';
import {
    Plus,
    FileText,
    DollarSign,
    Calendar,
    User,
    Eye,
    Filter,
    Search
} from 'lucide-react';
import { format } from 'date-fns';

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const data = await invoiceAPI.getAll();
            setInvoices(data);
        } catch (error) {
            console.error('Failed to fetch invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'funded':
                return 'bg-blue-100 text-blue-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

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
                    <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
                    <p className="text-gray-600 mt-2">Manage your uploaded invoices</p>
                </div>
                <Link href="/dashboard/upload">
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Upload Invoice
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search invoices..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="funded">Funded</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Invoices Grid */}
            {filteredInvoices.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm || statusFilter !== 'all'
                                ? 'No invoices match your current filters.'
                                : 'Upload your first invoice to get started.'}
                        </p>
                        {!searchTerm && statusFilter === 'all' && (
                            <Link href="/dashboard/upload">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Upload Invoice
                                </Button>
                            </Link>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInvoices.map((invoice) => (
                        <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{invoice.invoice_number}</CardTitle>
                                    <Badge className={getStatusColor(invoice.status)}>
                                        {invoice.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <DollarSign className="h-4 w-4" />
                                    <span className="font-medium">
                                        {invoice.currency} {invoice.amount.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="h-4 w-4" />
                                    <span>{invoice.customer_name}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Due: {format(new Date(invoice.due_date), 'MMM dd, yyyy')}</span>
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-500">
                                            Available: {invoice.currency} {invoice.available_amount.toLocaleString()}
                                        </div>
                                        <Link href={`/dashboard/invoices/${invoice.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}