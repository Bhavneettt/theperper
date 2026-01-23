'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '@/lib/api'
import { BeatBadge } from '@/components/BeatBadge'

interface WeeklyArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  author: {
    name: string
    avatar?: string
    title?: string
  }
  category: {
    name: string
    slug: string
  }
  publishedAt: string
}

export function WeeklyDigest() {
  const [topArticles, setTopArticles] = useState<WeeklyArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [themes, setThemes] = useState<string[]>([])

  useEffect(() => {
    async function fetchWeeklyContent() {
      try {
        // Get featured articles from this week
        const data = await getArticles({ 
          limit: 5,
          featured: true 
        })
        
        // Filter to last 7 days
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        
        const recentArticles = (data.articles || []).filter((article: any) => {
          const publishedDate = new Date(article.publishedAt)
          return publishedDate >= weekAgo
        }).slice(0, 5)

        setTopArticles(recentArticles)
        
        // Extract themes from categories
        const uniqueThemes = [...new Set(recentArticles.map((a: any) => a.category?.name).filter(Boolean))]
        setThemes(uniqueThemes.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch weekly digest:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchWeeklyContent()
  }, [])

  if (loading) {
    return (
      <section className="rounded-2xl bg-white dark:bg-surface-dark p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center py-8 text-gray-500">Loading weekly digest...</div>
      </section>
    )
  }

  if (topArticles.length === 0) {
    return null
  }

  return (
    <section className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-6 md:p-8 border border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center size-10 rounded-full bg-primary text-white shadow-lg">
            <span className="material-symbols-outlined">newspaper</span>
          </span>
          <div>
            <h3 className="text-2xl font-bold dark:text-white">Weekly Digest</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">This week in opinions</p>
          </div>
        </div>
        <Link href="/digest" className="text-sm text-primary font-bold hover:underline">
          View Archive
        </Link>
      </div>

      {/* Weekly Themes */}
      {themes.length > 0 && (
        <div className="mb-6 p-4 bg-white dark:bg-surface-dark rounded-lg">
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">This Week's Themes</p>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme, idx) => (
              <span
                key={idx}
                className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Voices */}
      <div className="space-y-4">
        {topArticles.slice(0, 3).map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group flex gap-4 p-4 bg-white dark:bg-surface-dark rounded-lg hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {article.category?.slug && (
                  <BeatBadge beatSlug={article.category.slug} size="sm" />
                )}
                <span className="text-xs text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors dark:text-white">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2">
                {article.author.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={20}
                    height={20}
                    className="size-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-5 rounded-full bg-gray-300"></div>
                )}
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {article.author.name}
                </span>
                {article.author.title && (
                  <span className="text-xs text-gray-500">• {article.author.title}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter Signup CTA */}
      <div className="mt-6 p-4 bg-primary text-white rounded-lg text-center">
        <p className="font-bold mb-2">Get the Weekly Digest in your inbox</p>
        <p className="text-sm mb-4 opacity-90">Stay updated with the week's top perspectives</p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 px-6 py-2 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Subscribe
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}
