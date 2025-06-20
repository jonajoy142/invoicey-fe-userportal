// src/app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        wallet_address: "",
        user_type: "business" as "business" | "investor",
        business_name: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { signup } = useAuth();
    const router = useRouter();

    const userTypeOptions = [
        { value: "business", label: "Business (Sell Invoices)" },
        { value: "investor", label: "Investor (Buy Invoices)" },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        if (!formData.wallet_address) {
            setError("Wallet address is required");
            return false;
        }
        if (formData.user_type === "business" && !formData.business_name) {
            setError("Business name is required for business accounts");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setLoading(true);

        try {
            const userData = {
                email: formData.email,
                password: formData.password,
                wallet_address: formData.wallet_address,
                user_type: formData.user_type,
                ...(formData.user_type === "business" && {
                    business_name: formData.business_name,
                }),
            };

            await signup(userData);
            router.push("/login?message=Account created successfully. Please login.");
        } catch (err: any) {
            setError(
                err.response?.data?.detail || "Signup failed. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your Invoicey account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join the blockchain invoice factoring revolution
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-medium text-gray-900">
                            Sign up for an account
                        </h3>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <Input
                                id="email"
                                name="email"
                                label="Email address"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />

                            <Input
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                            />

                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Confirm your password"
                            />

                            <Input
                                id="wallet_address"
                                name="wallet_address"
                                label="Wallet Address"
                                type="text"
                                value={formData.wallet_address}
                                onChange={handleChange}
                                required
                                placeholder="0x..."
                            />

                            <Select
                                id="user_type"
                                name="user_type"
                                label="Account Type"
                                value={formData.user_type}
                                onChange={handleChange}
                                options={userTypeOptions}
                                required
                            />

                            {formData.user_type === "business" && (
                                <Input
                                    id="business_name"
                                    name="business_name"
                                    label="Business Name"
                                    type="text"
                                    value={formData.business_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your business name"
                                />
                            )}

                            <Button type="submit" loading={loading} className="w-full">
                                Create Account
                            </Button>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link
                                        href="/dashboard/business" // /login
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
}
