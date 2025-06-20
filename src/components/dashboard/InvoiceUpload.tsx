'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Upload,
    FileText,
    X,
    AlertCircle,
    CheckCircle,
    DollarSign,
    Calendar,
    Building2,
    Loader2
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation schema
const invoiceSchema = z.object({
    invoiceNumber: z.string().min(1, 'Invoice number is required'),
    clientName: z.string().min(1, 'Client name is required'),
    amount: z.number().min(0.01, 'Amount must be greater than 0'),
    dueDate: z.string().min(1, 'Due date is required'),
    description: z.string().optional(),
    fundingPercentage: z.number().min(70).max(95).default(85),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface UploadedFile {
    file: File;
    preview: string;
    size: string;
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function InvoiceUpload() {
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            fundingPercentage: 85
        }
    });

    const watchedAmount = watch('amount');
    const watchedFundingPercentage = watch('fundingPercentage');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const uploadedFile: UploadedFile = {
                file,
                preview: URL.createObjectURL(file),
                size: formatFileSize(file.size)
            };
            setUploadedFile(uploadedFile);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.png', '.jpg', '.jpeg'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024 // 10MB
    });

    const removeFile = () => {
        if (uploadedFile) {
            URL.revokeObjectURL(uploadedFile.preview);
            setUploadedFile(null);
        }
    };

    const onSubmit = async (data: InvoiceFormData) => {
        if (!uploadedFile) {
            alert('Please upload an invoice file');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would make the actual API call
            const formData = new FormData();
            formData.append('file', uploadedFile.file);
            formData.append('invoiceData', JSON.stringify(data));

            // const response = await api.post('/invoices/upload', formData);

            setSubmitSuccess(true);
            console.log('Form submitted:', data);
            console.log('File:', uploadedFile.file);

        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fundingAmount = watchedAmount && watchedFundingPercentage
        ? (watchedAmount * watchedFundingPercentage / 100)
        : 0;

    if (submitSuccess) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow rounded-lg p-8