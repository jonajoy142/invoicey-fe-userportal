'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Upload,
    FileText,
    CreditCard,
    TrendingUp,
    Settings,
    LogOut,
    Menu,
    X,
    Building2,
    DollarSign,
    BarChart3,
    Wallet
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
    roles?: ('business' | 'investor')[];
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },

    // Business-specific routes
    { name: 'Upload Invoice', href: '/dashboard/business/upload', icon: Upload, roles: ['business'] },
    { name: 'My Invoices', href: '/dashboard/business/invoices', icon: FileText, roles: ['business'] },
    { name: 'Transactions', href: '/dashboard/business/transactions', icon: CreditCard, roles: ['business'] },

    // Investor-specific routes
    { name: 'Marketplace', href: '/dashboard/investor/marketplace', icon: Building2, roles: ['investor'] },
    { name: 'My Investments', href: '/dashboard/investor/portfolio', icon: DollarSign, roles: ['investor'] },
    { name: 'Analytics', href: '/dashboard/investor/analytics', icon: BarChart3, roles: ['investor'] },
    { name: 'Wallet', href: '/dashboard/investor/wallet', icon: Wallet, roles: ['investor'] },

    // Common routes
    { name: 'Profile', href: '/dashboard/profile', icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    // Filter navigation based on user role
    const filteredNavigation = navigation.filter(item =>
        !item.roles || item.roles.includes(user?.role as 'business' | 'investor')
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
                <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)} />

                <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <h1 className="text-xl font-bold text-blue-600">Invoicey</h1>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {filteredNavigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${isActive
                                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <item.icon className={`mr-4 h-6 w-6 ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-sm font-medium text-blue-600">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role || 'user'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <h1 className="text-xl font-bold text-blue-600">Invoicey</h1>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {filteredNavigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex items-center w-full">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-xs font-medium text-blue-600">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role || 'user'}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="ml-2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                title="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="md:pl-64 flex flex-col flex-1">
                {/* Top bar */}
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
                    <button
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Page content */}
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}