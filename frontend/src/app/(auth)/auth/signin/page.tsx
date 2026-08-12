'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'
import { Fraunces } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['700'],
})
const schibsted_grotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400','700']
})

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }


  return (
    <div className="space-y-6 bg-white p-8 shadow-sm rounded-md">
      <div className="space-y-1 text-center">
        <h1 className={`${fraunces.className} w-full text-center text-[38px] leading-[100%] font-bold tracking-[0] text-[#1A0F0B]`}>Welcome back</h1>
        <p className={`${schibsted_grotesk.className} w-full text-center text-[15px] leading-[150%] font-medium tracking-[0] text-[#6E625D]`}>Sign in to continue to the dashboard</p>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-200 dark:border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-50 px-2 text-zinc-400 dark:bg-zinc-950">or</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5 text-zinc-950">
          <label htmlFor="email" className={`${schibsted_grotesk.className} text-[13px] font-bold leading-[100%] text-[#1A0F0B]`}>
            Email
          </label>
          <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#B0BEC5]"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${schibsted_grotesk.className} h-[50px] w-full rounded-[12px] border-[1.5px] border-[#B0BEC5] bg-[#FFFCFB] pl-11 text-[14px] font-normal text-[#2A1D19] shadow-[0_2px_8px_rgba(205,90,57,0.0392)] placeholder:text-[#2A1D19] focus:outline-none focus:ring-2 focus:ring-[#87A1B2] aria-invalid:border-red-500`}
            placeholder="you@example.com"
            {...register('email')}
          />
          </div>
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5 text-zinc-950">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={`${schibsted_grotesk.className} text-[13px] font-bold leading-[100%] text-[#1A0F0B]`}>
              Password
            </label>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={`${schibsted_grotesk.className} h-[50px] w-full rounded-[12px] border-[1.5px] border-[#B0BEC5] bg-[#FFFCFB] pl-11 text-[14px] font-normal text-[#2A1D19] shadow-[0_2px_8px_rgba(205,90,57,0.0392)] placeholder:text-[#2A1D19] focus:outline-none focus:ring-2 focus:ring-[#87A1B2] aria-invalid:border-red-500`}
            placeholder="••••••••"
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error" className="text-xs text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${schibsted_grotesk.className} h-[52px] w-full rounded-[12px] bg-gradient-to-r from-[#87A1B2] to-[#617A8F] px-4 text-[16px] leading-[100%] font-bold text-white shadow-[0_6px_16px_rgba(205,90,57,0.251),0_2px_4px_rgba(205,90,57,0.102)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-950">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/signup"
          className="font-bold text-zinc-950 hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
