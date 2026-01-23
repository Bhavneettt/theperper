'use client'

interface OpinionIndicatorProps {
  type?: 'perspective' | 'opinion' | 'analysis' | 'debate'
  className?: string
}

export function OpinionIndicator({ 
  type = 'perspective',
  className = ''
}: OpinionIndicatorProps) {
  const config = {
    perspective: {
      icon: 'lightbulb',
      label: 'Perspective',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
    },
    opinion: {
      icon: 'chat_bubble',
      label: 'Opinion',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700'
    },
    analysis: {
      icon: 'analytics',
      label: 'Analysis',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
    },
    debate: {
      icon: 'balance',
      label: 'Debate',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700'
    }
  }

  const selected = config[type]

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${selected.color} ${className}`}>
      <span className="material-symbols-outlined text-[14px]">{selected.icon}</span>
      {selected.label}
    </span>
  )
}
