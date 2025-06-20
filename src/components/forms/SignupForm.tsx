'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/validations';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authService } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
    const router = useRouter();
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: any) => {
        setError('');
        try {
            const [first_name, ...lastArr] = (data.name || '').split(' ');
            const last_name = lastArr.join(' ') || '';
            const registerData = {
                email: data.email,
                password: data.password,
                role: data.role,
                first_name: first_name || '',
                last_name: last_name,
                company_name: data.role === 'business' ? data.company_name || '' : undefined,
            };
            await authService.register(registerData);
            router.push('/profile');
        } catch (err: any) {
            setError(err.message || 'Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Full Name" {...register('name')} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <Input placeholder="Email" {...register('email')} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <Input type="password" placeholder="Password" {...register('password')} />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select {...register('role')} className="w-full border rounded p-2">
                    <option value="">Select Role</option>
                    <option value="business">Business</option>
                    <option value="investor">Investor</option>
                </select>
                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </Button>
        </form>
    );
}
