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
      router.replace('/team')
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
      router.replace('/team')
      //router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }
/*
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/team')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }
    */


  return (
    <div className="w-full max-w-[480px] h-[547px] bg-white pt-[64px] px-[40px] pb-[40px] rounded-[24px] border border-[#EFECE6] shadow-[0_16px_40px_rgba(42,29,25,0.051),0_2px_8px_rgba(42,29,25,0.0118)]">
      <div className="space-y-1 text-center mb-[48px]">
        <h1 className={`${fraunces.className} w-full text-center text-[38px] leading-[100%] font-bold tracking-[0] text-[#1A0F0B]`}>Welcome back</h1>
        <p className={`${schibsted_grotesk.className} w-full text-center text-[15px] leading-[150%] font-medium tracking-[0] text-[#6E625D]`}>Sign in to continue to the dashboard</p>
      </div>

    
      

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5 text-zinc-950 mt-4">
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
            <label htmlFor="password" className={`${schibsted_grotesk.className} text-[13px] font-bold leading-[100%] text-[#1A0F0B]`}>
              Password
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
              className="pointer-events-none absolute left-4 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-[#A99D97]"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

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

          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-[#A99D97]"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696C3.46 7.6 7.282 5 12 5c4.718 0 8.54 2.6 9.938 6.652a1 1 0 0 1 0 .696C20.54 16.4 16.718 19 12 19c-4.718 0-8.54-2.6-9.938-6.652" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          {errors.password && (
            <p id="password-error" className="text-xs text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label
            className={`${schibsted_grotesk.className} flex items-center gap-2 text-[13px] font-normal text-[#6E625D]`}
          >
            <input
              type="checkbox"
              className="h-[18px] w-[18px] rounded-[4px] border border-[#B0BEC5] accent-[#87A1B2]"
            />
            Remember me
          </label>

          <span
            className={`${schibsted_grotesk.className} text-[13px] font-bold text-[#B0BEC5]`}
          >
            Forgot password?
          </span>
        </div>
       

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${schibsted_grotesk.className} h-[52px] w-full rounded-[12px] bg-gradient-to-r from-[#87A1B2] to-[#617A8F] px-4 text-[16px] leading-[100%] font-bold text-white shadow-[0_6px_16px_rgba(205,90,57,0.251),0_2px_4px_rgba(205,90,57,0.102)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-950 mt-6">
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
