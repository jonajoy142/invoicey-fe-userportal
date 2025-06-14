// import React from 'react';
// import { cn } from '@/lib/utils';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
//   size?: 'sm' | 'md' | 'lg';
//   loading?: boolean;
// }

// export function Button({
//   className,
//   variant = 'primary',
//   size = 'md',
//   loading = false,
//   disabled,
//   children,
//   ...props
// }: ButtonProps) {
//   const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

//   const variants = {
//     primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
//     secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
//     outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
//     ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
//   };

//   const sizes = {
//     sm: 'px-3 py-2 text-sm',
//     md: 'px-4 py-2 text-sm',
//     lg: 'px-6 py-3 text-base'
//   };

//   return (
//     <button
//       className={cn(
//         baseClasses,
//         variants[variant],
//         sizes[size],
//         className
//       )}
//       disabled={disabled || loading}
//       {...props}
//     >
//       {loading && (
//         <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
//           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//         </svg>
//       )}
//       {children}
//     </button>
//   );
// }

// // src/components/ui/Input.tsx
// import React from 'react';
// import { cn } from '@/lib/utils';

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   error?: string;
// }

// export function Input({
//   className,
//   label,
//   error,
//   id,
//   ...props
// }: InputProps) {
//   return (
//     <div className="space-y-1">
//       {label && (
//         <label htmlFor={id} className="block text-sm font-medium text-gray-700">
//           {label}
//         </label>
//       )}
//       <input
//         id={id}
//         className={cn(
//           'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
//           error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
//           className
//         )}
//         {...props}
//       />
//       {error && (
//         <p className="text-sm text-red-600">{error}</p>
//       )}
//     </div>
//   );
// }

// // src/components/ui/Card.tsx
// import React from 'react';
// import { cn } from '@/lib/utils';

// interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
//   children: React.ReactNode;
// }

// export function Card({ className, children, ...props }: CardProps) {
//   return (
//     <div
//       className={cn(
//         'bg-white rounded-lg border border-gray-200 shadow-sm',
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// export function CardHeader({ className, children, ...props }: CardProps) {
//   return (
//     <div
//       className={cn('px-6 py-4 border-b border-gray-200', className)}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// }

// export function CardContent({ className, children, ...props }: CardProps) {
//   return (
//     <div className={cn('px-6 py-4', className)} {...props}>
//       {children}
//     </div>
//   );
// }

// // src/components/ui/Select.tsx
// import React from 'react';
// import { cn } from '@/lib/utils';

// interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
//   label?: string;
//   error?: string;
//   options: { value: string; label: string }[];
// }

// export function Select({
//   className,
//   label,
//   error,
//   options,
//   id,
//   ...props
// }: SelectProps) {
//   return (
//     <div className="space-y-1">
//       {label && (
//         <label htmlFor={id} className="block text-sm font-medium text-gray-700">
//           {label}
//         </label>
//       )}
//       <select
//         id={id}
//         className={cn(
//           'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
//           error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
//           className
//         )}
//         {...props}
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       {error && (
//         <p className="text-sm text-red-600">{error}</p>
//       )}
//     </div>
//   );
// }

// // src/lib/utils.ts
// import { type ClassValue, clsx } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }



// src/components/ui/button.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', loading, children, disabled, ...props }, ref) => {
        const variants = {
            default: 'bg-blue-600 text-white hover:bg-blue-700',
            destructive: 'bg-red-600 text-white hover:bg-red-700',
            outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
            secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
            ghost: 'hover:bg-gray-100 text-gray-700',
            link: 'text-blue-600 underline-offset-4 hover:underline'
        };

        const sizes = {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10'
        };

        return (
            <button
                className={cn(
                    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };