'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginSchema } from '@/lib/validations'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async () => {
        // Direct navigation without auth
        router.push('/dashboard/business')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Email" {...register('email')} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <Input type="password" placeholder="Password" {...register('password')} />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    )
}
