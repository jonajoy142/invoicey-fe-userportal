// src/app/dashboard/upload/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { invoiceAPI } from '@/lib/api';
import { Upload, FileText, DollarSign, Calendar, User, Mail } from 'lucide-react';

const invoiceSchema = z.object({
  invoice_number: z.string().min(1, 'Invoice number is required'),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
  currency: z.string().default('USD'),
  due_date: z.string().min(1, 'Due date is required'),
  discount_rate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
    message: 'Discount rate must be between 0 and 100',
  }),
  customer_name: z.string().min(1, 'Customer name is required'),
  customer_email: z.string().email('Invalid email address'),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

export default function UploadInvoicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      currency: 'USD',
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const onSubmit = async (data: InvoiceFormData) => {
    setIsLoading(true);
    try {
      const invoiceData = {
        ...data,
        amount: parseFloat(data.amount),
        discount_rate: parseFloat(data.discount_rate),
        due_date: new Date(data.due_date).toISOString(),
      };

      const response = await invoiceAPI.create(invoiceData);

      // Show success message or redirect
      alert('Invoice uploaded successfully!');
      router.push('/dashboard');
      reset();
      setUploadedFile(null);
    } catch (error) {
      console.error('Failed to upload invoice:', error);
      alert('Failed to upload invoice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Invoice</h1>
        <p className="text-gray-600 mt-2">Upload your invoice for factoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Invoice Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                {uploadedFile ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <FileText className="h-8 w-8" />
                    <span className="font-medium">{uploadedFile.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <span className="text-lg font-medium text-gray-700">
                      Drop your invoice here
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      or click to browse
                    </span>
                  </>
                )}
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, JPG, PNG (Max 10MB)
            </p>
          </CardContent>
        </Card>

        {/* Invoice Details Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number
                </label>
                <Input
                  {...register('invoice_number')}
                  placeholder="INV-001"
                  error={errors.invoice_number?.message}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...register('amount')}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-10"
                      error={errors.amount?.message}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    {...register('currency')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...register('due_date')}
                      type="date"
                      className="pl-10"
                      error={errors.due_date?.message}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Rate (%)
                  </label>
                  <Input
                    {...register('discount_rate')}
                    type="number"
                    step="0.01"
                    placeholder="2.5"
                    error={errors.discount_rate?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    {...register('customer_name')}
                    placeholder="Customer Company Ltd"
                    className="pl-10"
                    error={errors.customer_name?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    {...register('customer_email')}
                    type="email"
                    placeholder="customer@example.com"
                    className="pl-10"
                    error={errors.customer_email?.message}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Uploading...' : 'Upload Invoice'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      {uploadedFile && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Invoice Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                File: {uploadedFile.name}
              </p>
              <p className="text-sm text-gray-600">
                Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {/* Add PDF preview or image preview here if needed */}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}