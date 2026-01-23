'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFeaturedArticles } from '@/lib/api'
import Image from 'next/image'
import { BeatBadge } from '@/components/BeatBadge'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  imageUrl?: string
  readTime: number
  contentType?: string
  editorNote?: string
  author: {
    name: string
    avatar?: string
    title?: string
    company?: string
    industry?: string
  }
  category: {
    name: string
    slug: string
  }
  publishedAt: string
}

export function FeaturedPerspectives() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getFeaturedArticles()
        setArticles(data)
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h3 className="text-3xl font-bold dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
            Featured Perspectives
          </h3>
        </div>
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </section>
    )
  }

  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1, 3)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        <h3 className="text-3xl font-bold dark:text-white flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
          Featured Perspectives
        </h3>
        <Link href="/articles" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
          View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredArticle && (
          <div className="md:col-span-2 group relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-transparent shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="h-64 w-full overflow-hidden">
              {featuredArticle.imageUrl ? (
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
              )}
            </div>
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide flex-wrap">
                <span className="text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">Editor's Pick</span>
                {featuredArticle.category?.slug && (
                  <BeatBadge beatSlug={featuredArticle.category.slug} size="sm" />
                )}
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{new Date(featuredArticle.publishedAt).toLocaleDateString()}</span>
              </div>
              <Link href={`/articles/${featuredArticle.slug}`}>
                <h3 className="text-3xl font-bold leading-tight group-hover:text-primary transition-colors dark:text-white">
                  {featuredArticle.title}
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed line-clamp-2">
                {featuredArticle.excerpt}
              </p>
              {featuredArticle.editorNote && (
                <div className="bg-primary/5 border-l-4 border-primary p-3 rounded-r">
                  <p className="text-xs font-bold text-primary uppercase mb-1">Why This Matters</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{featuredArticle.editorNote}</p>
                </div>
              )}
              <div className="flex items-start justify-between mt-2 gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {featuredArticle.author.avatar ? (
                    <Image
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover border-[3px] border-primary/30"
                    />
                  ) : (
                    <div className="size-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-[3px] border-primary/30"></div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-base font-black text-gray-900 dark:text-white">{featuredArticle.author.name}</span>
                    {(featuredArticle.author.title || featuredArticle.author.company) && (
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {featuredArticle.author.title}
                        {featuredArticle.author.title && featuredArticle.author.company && ' at '}
                        {featuredArticle.author.company}
                      </span>
                    )}
                    {featuredArticle.author.industry && (
                      <span className="text-xs text-primary font-medium mt-0.5">{featuredArticle.author.industry}</span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">{featuredArticle.readTime} min read</span>
              </div>
            </div>
          </div>
        )}
        {otherArticles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="group flex flex-col gap-4 p-5 rounded-xl bg-white dark:bg-surface-dark/50 border border-gray-200 dark:border-transparent hover:border-primary/30 transition-all">
            <div className="h-48 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
              {article.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {article.category?.slug && (
                <BeatBadge beatSlug={article.category.slug} size="sm" />
              )}
              <h4 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors dark:text-white">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
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
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{article.author.name}</span>
                {article.author.title && (
                  <span className="text-xs text-gray-500">• {article.author.title}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
