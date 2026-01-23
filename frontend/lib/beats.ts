// Industry Beats Configuration
// Color-coded visual identifiers for the 8 industry beats

export interface IndustryBeat {
  slug: string
  name: string
  description: string
  color: string
  icon?: string
}

export const INDUSTRY_BEATS: IndustryBeat[] = [
  {
    slug: 'technology-innovation',
    name: 'Technology & Innovation',
    description: 'Where ideas meet impact',
    color: '#137fec', // Blue
    icon: 'memory'
  },
  {
    slug: 'business-leadership',
    name: 'Business & Leadership',
    description: 'Beyond boardrooms and balance sheets',
    color: '#8b5cf6', // Purple
    icon: 'business_center'
  },
  {
    slug: 'sustainability-purpose',
    name: 'Sustainability & Purpose',
    description: 'The business of doing good',
    color: '#10b981', // Green
    icon: 'eco'
  },
  {
    slug: 'work-culture',
    name: 'Work & Culture',
    description: 'Inside the evolving workplace',
    color: '#f59e0b', // Amber
    icon: 'groups'
  },
  {
    slug: 'consumer-lifestyle',
    name: 'Consumer & Lifestyle',
    description: 'From insight to instinct',
    color: '#ec4899', // Pink
    icon: 'shopping_bag'
  },
  {
    slug: 'policy-public-discourse',
    name: 'Policy & Public Discourse',
    description: 'Where industry meets society',
    color: '#6366f1', // Indigo
    icon: 'gavel'
  },
  {
    slug: 'education-future-skills',
    name: 'Education & Future Skills',
    description: 'Learning redefined',
    color: '#06b6d4', // Cyan
    icon: 'school'
  },
  {
    slug: 'health-wellbeing',
    name: 'Health & Wellbeing',
    description: 'A human-first lens on healthcare',
    color: '#ef4444', // Red
    icon: 'favorite'
  }
]

export function getBeatBySlug(slug: string): IndustryBeat | undefined {
  return INDUSTRY_BEATS.find(beat => beat.slug === slug)
}

export function getBeatColor(slug: string): string {
  const beat = getBeatBySlug(slug)
  return beat?.color || '#137fec'
}

export function getBeatName(slug: string): string {
  const beat = getBeatBySlug(slug)
  return beat?.name || slug
}
