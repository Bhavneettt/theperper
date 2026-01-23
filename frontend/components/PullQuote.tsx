'use client'

import Image from 'next/image'

interface PullQuoteProps {
  quote: string
  author: {
    name: string
    avatar?: string
    title?: string
    company?: string
  }
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PullQuote({ 
  quote, 
  author, 
  size = 'md',
  className = ''
}: PullQuoteProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  return (
    <div className={`my-8 p-8 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl border-l-4 border-primary ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={64}
              height={64}
              className="size-16 rounded-full object-cover border-2 border-primary/30"
            />
          ) : (
            <div className="size-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-primary/30"></div>
          )}
        </div>
        <div className="flex-1">
          <blockquote className={`${sizeClasses[size]} font-display italic text-gray-900 dark:text-white leading-relaxed mb-4`}>
            "{quote}"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-primary/30"></div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{author.name}</p>
              {(author.title || author.company) && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {author.title}
                  {author.title && author.company && ' at '}
                  {author.company}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
