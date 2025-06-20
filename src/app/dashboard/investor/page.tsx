'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, FileText, TrendingUp, Timer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const InvestorDashboardPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-50 py-10 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Welcome Back, Investor 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Here's a quick overview of your investments and portfolio.
                    </p>
                </header>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Card className="shadow-md hover:shadow-lg transition duration-300">
                        <CardHeader className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-md">
                                <DollarSign className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-sm text-gray-700">Total Invested</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold text-gray-900">$94,200</CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition duration-300">
                        <CardHeader className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-md">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-sm text-gray-700">Active Invoices</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold text-gray-900">9</CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition duration-300">
                        <CardHeader className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-2 rounded-md">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-sm text-gray-700">ROI</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold text-gray-900">8.6%</CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition duration-300">
                        <CardHeader className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-2 rounded-md">
                                <Timer className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-sm text-gray-700">Avg. Return Time</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold text-gray-900">14d</CardContent>
                    </Card>
                </div>

                {/* Call to Action */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white border rounded-lg p-6 shadow-sm">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            Explore new invoice opportunities?
                        </h2>
                        <p className="text-gray-500">Browse available invoices and invest today.</p>
                    </div>
                    <Link href="/dashboard/investor/browse">
                        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                            🔍 Browse Invoices
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InvestorDashboardPage;
