'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '@/lib/api'

interface InsiderArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  imageUrl?: string
  author: {
    name: string
    avatar?: string
    title?: string
    company?: string
  }
  category: {
    name: string
    slug: string
  }
}

export function InsiderView() {
  const [articles, setArticles] = useState<InsiderArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInsiderArticles() {
      try {
        const data = await getArticles({ 
          contentType: 'INSIDER_VIEW',
          limit: 3,
          featured: false 
        })
        setArticles(data.articles || [])
      } catch (error) {
        console.error('Failed to fetch insider articles:', error)
        // Fallback to empty array
        setArticles([])
      } finally {
        setLoading(false)
      }
    }
    fetchInsiderArticles()
  }, [])

  if (loading) {
    return (
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">visibility</span>
            The Insider View
          </h3>
        </div>
        <div className="text-center py-8 text-gray-500">Loading insider perspectives...</div>
      </section>
    )
  }

  if (articles.length === 0) {
    return (
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">visibility</span>
            The Insider View
          </h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>No insider perspectives available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">visibility</span>
            The Insider View
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Opinion essays by professionals in mid-to-senior roles</p>
        </div>
        <Link href="/articles?contentType=INSIDER_VIEW" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
          View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-md">
            {article.imageUrl ? (
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute top-3 left-3">
              <span className="text-xs font-bold text-white bg-primary/80 backdrop-blur-sm px-2 py-1 rounded uppercase">Insider Perspective</span>
            </div>
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <span className="text-xs font-bold text-blue-300 uppercase mb-2 block">{article.category.name}</span>
              <h4 className="text-lg font-bold text-white leading-snug group-hover:text-blue-300 transition-colors mb-2">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 mt-2">
                {article.author.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={20}
                    height={20}
                    className="size-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-5 rounded-full bg-white/20"></div>
                )}
                <span className="text-xs text-white/90 font-medium">{article.author.name}</span>
                {article.author.title && (
                  <span className="text-xs text-white/70">• {article.author.title}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
