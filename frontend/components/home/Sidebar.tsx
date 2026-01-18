'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { subscribeNewsletter, getActivePoll, votePoll } from '@/lib/api'

export function Sidebar() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [poll, setPoll] = useState<any>(null)
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    async function fetchPoll() {
      try {
        const data = await getActivePoll()
        setPoll(data)
        // Check if user has voted (stored in localStorage)
        const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]')
        if (votedPolls.includes(data.id)) {
          setVoted(true)
        }
      } catch (error) {
        console.error('Failed to fetch poll:', error)
      }
    }
    fetchPoll()
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await subscribeNewsletter(email)
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to subscribe')
    }
  }

  const handleVote = async (optionId: string) => {
    if (voted || !poll) return
    
    try {
      const updatedPoll = await votePoll(poll.id, optionId)
      setPoll(updatedPoll)
      setVoted(true)
      
      // Store voted poll in localStorage
      const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]')
      votedPolls.push(poll.id)
      localStorage.setItem('votedPolls', JSON.stringify(votedPolls))
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to vote')
    }
  }

  return (
    <aside className="lg:col-span-4 flex flex-col gap-8 h-full">
      {/* Newsletter */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 dark:border-primary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="material-symbols-outlined text-primary text-9xl">mark_email_unread</span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
            <span className="material-symbols-outlined text-primary">mail</span>
            <h3 className="text-lg font-bold">Weekly Digest</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
            Get the "Monday Morning Briefing" delivered to your inbox. Curated insights for the week ahead.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-white dark:bg-[#1a2938] border-gray-200 dark:border-gray-700 text-sm px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none shadow-sm dark:text-white"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm py-3 transition-colors shadow-md"
            >
              {subscribed ? 'Subscribed!' : 'Join 25,000+ Leaders'}
            </button>
          </form>
        </div>
      </div>

      {/* Pulse Check Poll */}
      {poll && (
        <div className="p-6 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-transparent shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">equalizer</span>
              Pulse Check
            </h3>
            <span className="text-[10px] font-bold uppercase bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-1 rounded">Live Poll</span>
          </div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            {poll.question}
          </h4>
          <div className="flex flex-col gap-3">
            {poll.options.map((option: any) => (
              <div
                key={option.id}
                onClick={() => !voted && handleVote(option.id)}
                className={`relative group cursor-pointer ${voted ? 'cursor-default' : ''}`}
              >
                <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-300 mb-1 z-10 relative">
                  <span>{option.text}</span>
                  <span>{option.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      option.percentage > 0 ? 'bg-primary' : 'bg-gray-400'
                    }`}
                    style={{ width: `${option.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {voted && (
            <p className="mt-4 text-xs text-gray-500 text-center">Thank you for voting!</p>
          )}
        </div>
      )}

      {/* Trending Now */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold px-1 dark:text-white">Trending Now</h3>
        <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-transparent bg-white dark:bg-surface-dark shadow-sm">
          <Link href="/articles" className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800">
            <span className="text-2xl font-black text-gray-200 dark:text-gray-700">01</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">The End of "Move Fast & Break Things"</span>
              <span className="text-xs text-primary mt-1">Ethics</span>
            </div>
          </Link>
          <Link href="/articles" className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800">
            <span className="text-2xl font-black text-gray-200 dark:text-gray-700">02</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">Sustainable Supply Chains</span>
              <span className="text-xs text-primary mt-1">Operations</span>
            </div>
          </Link>
          <Link href="/articles" className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="text-2xl font-black text-gray-200 dark:text-gray-700">03</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">Gen Z in the Boardroom</span>
              <span className="text-xs text-primary mt-1">Talent</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Podcast CTA */}
      <Link href="/podcasts/create" className="rounded-xl bg-surface-dark p-6 text-center flex flex-col items-center justify-center gap-4 relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="material-symbols-outlined text-white text-5xl">mic</span>
        <h4 className="text-white font-bold text-lg">Launch Your Own Podcast</h4>
        <p className="text-gray-300 text-sm">Join our creator network and reach millions.</p>
      </Link>
    </aside>
  )
}
