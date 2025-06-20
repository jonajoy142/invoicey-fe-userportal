"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textArea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Upload } from "lucide-react";

export default function UploadInvoicePage() {
    const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [submitted, setSubmitted] = useState(false);

    const handleUpload = () => {
        if (!invoiceFile || !amount || !dueDate) {
            alert("Please fill in all fields.");
            return;
        }
        setSubmitted(true);
        setTimeout(() => {
            alert("Invoice uploaded successfully (mock)");
        }, 500);
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Upload New Invoice
            </h1>

            <div className="space-y-5">
                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Invoice File (PDF/Image)
                    </label>
                    <Input
                        type="file"
                        accept="application/pdf,image/*"
                        className="text-gray-900 dark:text-white file:text-gray-900 file:dark:text-white"
                        onChange={(e) => setInvoiceFile(e.target.files?.[0] || null)}
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Amount
                    </label>
                    <Input
                        type="number"
                        placeholder="$1000"
                        className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <Textarea
                        rows={3}
                        placeholder="Work completed for X client"
                        className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Due Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Due Date
                    </label>
                    <Calendar selected={dueDate} onSelect={setDueDate} />
                    {dueDate && (
                        <p className="text-sm text-gray-500 mt-1">
                            Selected: {format(dueDate, "PPP")}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    onClick={handleUpload}
                    className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                    <Upload className="w-4 h-4 mr-2" /> Submit Invoice
                </Button>

                {submitted && (
                    <p className="mt-4 text-green-600 font-medium">
                        ✅ Invoice uploaded (mock confirmation)
                    </p>
                )}
            </div>
        </div>
    );
}
