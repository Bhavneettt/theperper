'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getActiveDebate } from '@/lib/api'

interface DebateArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  author: {
    name: string
    avatar?: string
    title?: string
    company?: string
  }
}

interface Debate {
  id: string
  title: string
  slug: string
  description: string
  articles: DebateArticle[]
}

export function DebateRoom() {
  const [debate, setDebate] = useState<Debate | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDebate() {
      try {
        const data = await getActiveDebate()
        setDebate(data)
      } catch (error) {
        console.error('Failed to fetch debate:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDebate()
  }, [])

  if (loading) {
    return (
      <section className="rounded-2xl bg-gray-50 dark:bg-surface-dark p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center size-10 rounded-full bg-red-500 text-white shadow-lg">
            <span className="material-symbols-outlined">gavel</span>
          </span>
          <div>
            <h3 className="text-2xl font-bold dark:text-white">The Debate Room</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Two experts, one topic, opposing views.</p>
          </div>
        </div>
        <div className="text-center py-8 text-gray-500">Loading debate...</div>
      </section>
    )
  }

  if (!debate || debate.articles.length < 2) {
    return (
      <section className="rounded-2xl bg-gray-50 dark:bg-surface-dark p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center size-10 rounded-full bg-red-500 text-white shadow-lg">
            <span className="material-symbols-outlined">gavel</span>
          </span>
          <div>
            <h3 className="text-2xl font-bold dark:text-white">The Debate Room</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Two experts, one topic, opposing views.</p>
          </div>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>No active debate at the moment.</p>
          <p className="text-sm mt-2">Check back soon for new perspectives!</p>
        </div>
      </section>
    )
  }

  const [article1, article2] = debate.articles

  return (
    <section className="rounded-2xl bg-gray-50 dark:bg-surface-dark p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center size-10 rounded-full bg-red-500 text-white shadow-lg">
            <span className="material-symbols-outlined">gavel</span>
          </span>
          <div>
            <h3 className="text-2xl font-bold dark:text-white">The Debate Room</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Two experts, one topic, opposing views.</p>
          </div>
        </div>
        <Link href={`/debates/${debate.slug}`} className="text-sm text-primary font-bold hover:underline">
          View All Debates
        </Link>
      </div>
      
      {debate.description && (
        <div className="mb-6 p-4 bg-white dark:bg-surface-dark/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-bold dark:text-white mb-2">{debate.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{debate.description}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            {article1.author.avatar ? (
              <Image
                src={article1.author.avatar}
                alt={article1.author.name}
                width={48}
                height={48}
                className="size-12 rounded-full border-2 border-primary object-cover"
              />
            ) : (
              <div className="size-12 rounded-full border-2 border-primary p-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
              </div>
            )}
            <div>
              <h5 className="text-sm font-bold dark:text-white">{article1.author.name}</h5>
              {article1.author.title && (
                <span className="text-xs text-gray-500 dark:text-gray-400">{article1.author.title}</span>
              )}
              {article1.author.company && (
                <span className="text-xs text-gray-500 dark:text-gray-400"> at {article1.author.company}</span>
              )}
            </div>
          </div>
          <h4 className="text-xl font-bold dark:text-white leading-tight">"{article1.title}"</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{article1.excerpt}</p>
          <Link href={`/articles/${article1.slug}`} className="mt-auto self-start text-sm font-bold text-primary hover:underline flex items-center gap-1">
            Read Argument <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="relative flex items-center justify-center py-4 md:py-0">
          <div className="absolute inset-0 md:inset-x-[50%] md:w-px h-px md:h-full bg-gray-300 dark:bg-gray-600"></div>
          <span className="relative z-10 bg-white dark:bg-surface-dark px-3 py-1 text-sm font-black text-gray-400 uppercase tracking-widest rounded-full border-2 border-gray-300 dark:border-gray-600">VS</span>
        </div>
        <div className="flex-1 flex flex-col gap-4 text-right md:items-end">
          <div className="flex items-center gap-3 mb-2 flex-row-reverse">
            {article2.author.avatar ? (
              <Image
                src={article2.author.avatar}
                alt={article2.author.name}
                width={48}
                height={48}
                className="size-12 rounded-full border-2 border-green-500 object-cover"
              />
            ) : (
              <div className="size-12 rounded-full border-2 border-green-500 p-0.5">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
              </div>
            )}
            <div className="text-right">
              <h5 className="text-sm font-bold dark:text-white">{article2.author.name}</h5>
              {article2.author.title && (
                <span className="text-xs text-gray-500 dark:text-gray-400">{article2.author.title}</span>
              )}
              {article2.author.company && (
                <span className="text-xs text-gray-500 dark:text-gray-400"> at {article2.author.company}</span>
              )}
            </div>
          </div>
          <h4 className="text-xl font-bold dark:text-white leading-tight">"{article2.title}"</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{article2.excerpt}</p>
          <Link href={`/articles/${article2.slug}`} className="mt-auto self-end text-sm font-bold text-green-500 hover:underline flex items-center gap-1">
            Read Argument <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
