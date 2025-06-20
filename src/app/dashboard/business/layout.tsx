// ✅ /dashboard/business/layout.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const devUser = user ?? {
        email: 'demo@invoicey.com',
        user_type: 'business',
        business_name: 'DemoCorp',
        kyc_status: 'approved',
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard/business', icon: '📊' },
        { name: 'Upload Invoice', href: '/dashboard/business/upload', icon: '📄' },
        { name: 'My Invoices', href: '/dashboard/business/invoices', icon: '📋' },
        { name: 'Transactions', href: '/dashboard/business/transactions', icon: '💳' },
        { name: 'Analytics', href: '/dashboard/business/analytics', icon: '📈' },
    ];

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 flex z-40 md:hidden`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                            onClick={() => setSidebarOpen(false)}
                        >
                            ✖
                        </button>
                    </div>
                    <div className="flex-1 pt-5 pb-4 overflow-y-auto">
                        <div className="px-4">
                            <h1 className="text-xl font-bold text-gray-900">Invoicey</h1>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navItems.map((item) => (
                                <Link key={item.name} href={item.href} className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                                    <span className="mr-4 text-lg">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64 bg-white border-r border-gray-200">
                    <div className="flex flex-col h-0 flex-1">
                        <div className="flex items-center px-4 py-5">
                            <h1 className="text-xl font-bold text-gray-900">Invoicey</h1>
                        </div>
                        <nav className="flex-1 px-2 space-y-1">
                            {navItems.map((item) => (
                                <Link key={item.name} href={item.href} className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                                    <span className="mr-3 text-lg">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="border-t border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                    {devUser.email.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700">
                                        {devUser.business_name || devUser.email}
                                    </p>
                                    <p className="text-xs text-gray-500 capitalize">{devUser.user_type}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow px-4 items-center justify-between">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500">
                        ☰
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Welcome back, {devUser.business_name || devUser.email}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${devUser.kyc_status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : devUser.kyc_status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                            KYC: {devUser.kyc_status}
                        </span>
                        <Button variant="outline" size="sm" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </div>

                <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
