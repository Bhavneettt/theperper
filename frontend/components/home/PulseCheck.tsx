'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BeatBadge } from '@/components/BeatBadge'

interface PulseCheckItem {
  id: string
  title: string
  slug: string
  pressRelease: string
  expertCommentary: string
  expert: {
    name: string
    avatar?: string
    title?: string
    company?: string
  }
  category: {
    name: string
    slug: string
  }
  prSpin?: boolean
  relatedArticles?: Array<{
    id: string
    title: string
    slug: string
  }>
  publishedAt: string
}

// Mock data - replace with API call
const pulseCheckItems: PulseCheckItem[] = [
  {
    id: '1',
    title: 'Tech Giant Announces AI Safety Initiative',
    slug: 'tech-ai-safety',
    pressRelease: 'Major technology company announces $50M investment in AI safety research...',
    expertCommentary: 'While the investment is significant, the real question is whether this addresses the fundamental governance gaps in AI development. The industry needs transparency, not just funding.',
    expert: {
      name: 'Dr. Sarah Chen',
      title: 'AI Ethics Researcher',
      company: 'Tech Policy Institute'
    },
    category: {
      name: 'Technology & Innovation',
      slug: 'technology-innovation'
    },
    prSpin: true,
    publishedAt: new Date().toISOString()
  }
]

export function PulseCheck() {
  const [selectedItem, setSelectedItem] = useState<PulseCheckItem | null>(null)

  if (pulseCheckItems.length === 0) {
    return null
  }

  const item = pulseCheckItems[0] // Show first item for now

  return (
    <section className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-surface-dark dark:to-gray-900 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center size-10 rounded-full bg-purple-500 text-white shadow-lg">
            <span className="material-symbols-outlined">equalizer</span>
          </span>
          <div>
            <h3 className="text-2xl font-bold dark:text-white">Pulse Check</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Press releases with expert commentary</p>
          </div>
        </div>
        <Link href="/pulse-check" className="text-sm text-primary font-bold hover:underline">
          View All
        </Link>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-4 mb-4">
          {item.category.slug && (
            <BeatBadge beatSlug={item.category.slug} size="sm" />
          )}
          {item.prSpin && (
            <span className="text-xs font-bold text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded uppercase">
              PR Spin Detected
            </span>
          )}
        </div>

        <h4 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h4>

        {/* Press Release Section */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-l-4 border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-gray-500 text-sm">description</span>
            <span className="text-xs font-bold text-gray-500 uppercase">Press Release</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">{item.pressRelease}</p>
        </div>

        {/* Expert Commentary */}
        <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border-l-4 border-primary">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
            <span className="text-xs font-bold text-primary uppercase">Expert Commentary</span>
          </div>
          <div className="flex items-start gap-3 mb-3">
            {item.expert.avatar ? (
              <Image
                src={item.expert.avatar}
                alt={item.expert.name}
                width={32}
                height={32}
                className="size-8 rounded-full object-cover"
              />
            ) : (
              <div className="size-8 rounded-full bg-primary/20"></div>
            )}
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">
                {item.expert.name}
              </p>
              {(item.expert.title || item.expert.company) && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {item.expert.title}
                  {item.expert.title && item.expert.company && ' at '}
                  {item.expert.company}
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {item.expertCommentary}
          </p>
        </div>

        {item.relatedArticles && item.relatedArticles.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Related Perspectives</p>
            <div className="flex flex-wrap gap-2">
              {item.relatedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="text-xs text-primary hover:underline"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
