'use client'

import Link from 'next/link'

interface DropdownItem {
  label: string
  href: string
  description?: string
}

interface DropdownSection {
  title?: string
  items: DropdownItem[]
}

interface DropdownProps {
  sections: DropdownSection[]
  featuredContent?: {
    title: string
    slug: string
    imageUrl?: string
    readTime?: number
  }
}

export function HeaderDropdown({ sections, featuredContent }: DropdownProps) {
  return (
    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-full left-0 w-[600px] bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-b-xl shadow-2xl transition-all duration-200 p-6 z-50">
      <div className="grid grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            {section.title && (
              <h4 className="text-xs font-bold text-primary uppercase mb-3">{section.title}</h4>
            )}
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link 
                    href={item.href} 
                    className="group/item block"
                  >
                    <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover/item:text-primary transition-colors block">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                        {item.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {featuredContent && (
          <div>
            <h4 className="text-xs font-bold text-primary uppercase mb-3">Featured</h4>
            <Link href={featuredContent.slug} className="flex gap-3 group/item">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden shrink-0">
                {featuredContent.imageUrl ? (
                  <img
                    src={featuredContent.imageUrl}
                    alt={featuredContent.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight group-hover/item:text-primary">
                  {featuredContent.title}
                </span>
                {featuredContent.readTime && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {featuredContent.readTime} min read
                  </span>
                )}
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
