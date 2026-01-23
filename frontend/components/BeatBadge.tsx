'use client'

import Link from 'next/link'
import { getBeatBySlug, IndustryBeat } from '@/lib/beats'

interface BeatBadgeProps {
  beatSlug: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
  link?: boolean
  className?: string
}

export function BeatBadge({ 
  beatSlug, 
  showIcon = false, 
  size = 'md',
  link = false,
  className = ''
}: BeatBadgeProps) {
  const beat = getBeatBySlug(beatSlug)
  
  if (!beat) {
    return null
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5'
  }

  const content = (
    <span 
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full ${sizeClasses[size]} ${className}`}
      style={{ 
        backgroundColor: `${beat.color}15`,
        color: beat.color,
        borderColor: `${beat.color}40`
      }}
    >
      {showIcon && beat.icon && (
        <span className="material-symbols-outlined text-[14px]">{beat.icon}</span>
      )}
      {beat.name}
    </span>
  )

  if (link) {
    return (
      <Link href={`/articles?beat=${beat.slug}`} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}

interface BeatBadgeListProps {
  beats: IndustryBeat[]
  className?: string
}

export function BeatBadgeList({ beats, className = '' }: BeatBadgeListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {beats.map((beat) => (
        <BeatBadge key={beat.slug} beatSlug={beat.slug} link showIcon />
      ))}
    </div>
  )
}
