'use client'

interface ContentTypeIconProps {
  contentType: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const contentTypeConfig: Record<string, { icon: string; label: string; color: string }> = {
  FEATURED_PERSPECTIVE: {
    icon: 'auto_awesome',
    label: 'Featured Perspective',
    color: 'text-yellow-600 dark:text-yellow-400'
  },
  INSIDER_VIEW: {
    icon: 'visibility',
    label: 'Insider View',
    color: 'text-blue-600 dark:text-blue-400'
  },
  DEBATE_ROOM: {
    icon: 'gavel',
    label: 'Debate Room',
    color: 'text-red-600 dark:text-red-400'
  },
  PULSE_CHECK: {
    icon: 'equalizer',
    label: 'Pulse Check',
    color: 'text-purple-600 dark:text-purple-400'
  },
  WEEKLY_DIGEST: {
    icon: 'newspaper',
    label: 'Weekly Digest',
    color: 'text-green-600 dark:text-green-400'
  }
}

export function ContentTypeIcon({ 
  contentType, 
  size = 'md',
  showLabel = false,
  className = ''
}: ContentTypeIconProps) {
  const config = contentTypeConfig[contentType]
  
  if (!config) {
    return null
  }

  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span 
        className={`material-symbols-outlined ${sizeClasses[size]} ${config.color}`}
        title={config.label}
      >
        {config.icon}
      </span>
      {showLabel && (
        <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
          {config.label}
        </span>
      )}
    </div>
  )
}
