import { z } from "zod";

// Auth Validation Schemas
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be less than 100 characters"),
});

export const signupSchema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password must be less than 100 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            ),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        role: z.enum(["business", "investor"], {
            required_error: "Please select a role",
        }),
        first_name: z
            .string()
            .min(1, "First name is required")
            .max(50, "First name must be less than 50 characters")
            .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
        last_name: z
            .string()
            .min(1, "Last name is required")
            .max(50, "Last name must be less than 50 characters")
            .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
        company_name: z
            .string()
            .max(100, "Company name must be less than 100 characters")
            .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

// Profile Validation Schema
export const profileSchema = z.object({
    first_name: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name must be less than 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
    last_name: z
        .string()
        .min(1, "Last name is required")
        .max(50, "Last name must be less than 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
    company_name: z
        .string()
        .max(100, "Company name must be less than 100 characters")
        .optional()
        .or(z.literal("")),
    phone: z
        .string()
        .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
        .optional()
        .or(z.literal("")),
    address: z
        .string()
        .max(200, "Address must be less than 200 characters")
        .optional()
        .or(z.literal("")),
});

// Invoice Validation Schema
export const invoiceUploadSchema = z.object({
    invoice_number: z
        .string()
        .min(1, "Invoice number is required")
        .max(50, "Invoice number must be less than 50 characters"),
    amount: z
        .number()
        .min(1, "Amount must be greater than 0")
        .max(1000000, "Amount must be less than $1,000,000"),
    due_date: z
        .string()
        .min(1, "Due date is required")
        .refine((date) => {
            const dueDate = new Date(date);
            const today = new Date();
            return dueDate > today;
        }, "Due date must be in the future"),
    customer_name: z
        .string()
        .min(1, "Customer name is required")
        .max(100, "Customer name must be less than 100 characters"),
    customer_email: z
        .string()
        .email("Please enter a valid customer email")
        .optional()
        .or(z.literal("")),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional()
        .or(z.literal("")),
});

// Investment Validation Schema
export const investmentSchema = z.object({
    invoice_id: z.string().min(1, "Invoice ID is required"),
    amount: z
        .number()
        .min(1, "Investment amount must be greater than 0")
        .max(1000000, "Investment amount must be less than $1,000,000"),
});

// Search and Filter Schemas
export const invoiceFilterSchema = z.object({
    status: z
        .enum(["pending", "funded", "completed", "overdue", "all"])
        .optional(),
    amount_min: z.number().min(0).optional(),
    amount_max: z.number().min(0).optional(),
    due_date_from: z.string().optional(),
    due_date_to: z.string().optional(),
    search: z.string().optional(),
});

export const marketplaceFilterSchema = z.object({
    risk_level: z.enum(["low", "medium", "high", "all"]).optional(),
    amount_min: z.number().min(0).optional(),
    amount_max: z.number().min(0).optional(),
    return_min: z.number().min(0).optional(),
    return_max: z.number().min(0).optional(),
    duration_min: z.number().min(0).optional(),
    duration_max: z.number().min(0).optional(),
    search: z.string().optional(),
});

// File Upload Validation
export const fileUploadSchema = z.object({
    file: z
        .any()
        .refine((file) => file instanceof File, "Please select a file")
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "File size must be less than 5MB",
        )
        .refine(
            (file) =>
                ["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(
                    file.type,
                ),
            "Only PDF, JPEG, and PNG files are allowed",
        ),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type InvoiceUploadFormData = z.infer<typeof invoiceUploadSchema>;
export type InvestmentFormData = z.infer<typeof investmentSchema>;
export type InvoiceFilterData = z.infer<typeof invoiceFilterSchema>;
export type MarketplaceFilterData = z.infer<typeof marketplaceFilterSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;

// Validation helper functions
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (
    password: string,
): {
    isValid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

export const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone);
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
