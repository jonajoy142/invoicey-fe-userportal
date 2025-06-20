'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validations'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { authService } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginSchema) => {
        const result = await loginUser(data)
        if (result?.success) {
            router.push('/dashboard')
        } else {
            setError(result?.message || 'Login failed')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Email" {...register('email')} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <Input type="password" placeholder="Password" {...register('password')} />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            {error && <p className="text-red-600">{error}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    )
}
