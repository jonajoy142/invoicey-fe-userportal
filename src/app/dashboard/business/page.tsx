"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Plus, Users, Timer } from "lucide-react";
import Link from "next/link";

const BusinessDashboardPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 py-10 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Welcome Back, Business User 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Here's a quick snapshot of your funding activity and invoices.
                    </p>
                </header>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Card className="shadow-md hover:shadow-lg transition duration-300">
                        <CardHeader className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-md">
                                <DollarSign className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-sm text-gray-700">Total Funded</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold text-gray-900">$128,450</CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition duration-300">
                        <CardHeader className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-md">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-sm text-gray-700">Active Invoices</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold text-gray-900">12</CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition duration-300">
                        <CardHeader className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-2 rounded-md">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-sm text-gray-700">Investors Engaged</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold text-gray-900">4</CardContent>
                    </Card>

                    <Card className="shadow-md hover:shadow-lg transition duration-300">
                        <CardHeader className="flex items-center gap-4">
                            <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-2 rounded-md">
                                <Timer className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-sm text-gray-700">Funding Speed</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold text-gray-900">3m 45s</CardContent>
                    </Card>
                </div>

                {/* Call to Action */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white border rounded-lg p-6 shadow-sm">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            Ready to upload a new invoice?
                        </h2>
                        <p className="text-gray-500">Submit it and get funded instantly.</p>
                    </div>
                    <Link href="/dashboard/business/upload">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Upload Invoice
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BusinessDashboardPage;
