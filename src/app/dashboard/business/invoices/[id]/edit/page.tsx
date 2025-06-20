"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockInvoices } from "@/mockData";

export default function EditInvoicePage() {
    const { id } = useParams();
    const router = useRouter();

    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [dueDate, setDueDate] = useState("");
    const [discountRate, setDiscountRate] = useState(0);

    useEffect(() => {
        const invoice = mockInvoices.find((inv) => inv.id === id);
        if (invoice) {
            setInvoiceNumber(invoice.invoice_number);
            setAmount(invoice.amount);
            setDueDate(invoice.due_date);
            setDiscountRate(invoice.discount_rate);
        }
    }, [id]);

    const handleSave = () => {
        // This is where you'd call your API to persist the changes
        console.log("Saving invoice:", {
            id,
            invoiceNumber,
            amount,
            dueDate,
            discountRate,
        });
        router.push(`/dashboard/business/invoices/${id}`);
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 block text-gray-900">Edit Invoice</h1>
            <div className="space-y-4">
                <label className="block text-gray-900">
                    Invoice Number
                    <Input
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                </label>

                <label className="block text-gray-900">
                    Amount
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </label>

                <label className="block text-gray-900">
                    Due Date
                    <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </label>

                <label className="block text-gray-900">
                    Discount Rate (%)
                    <Input
                        type="number"
                        step="0.1"
                        value={discountRate}
                        onChange={(e) => setDiscountRate(Number(e.target.value))}
                    />
                </label>

                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
}
