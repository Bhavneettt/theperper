'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: Implement actual login API call
      // For now, just redirect to home
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to your contributor account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm py-3 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary font-bold hover:underline">
                Become a Contributor
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
