import { getAuthors } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { BeatBadge } from '@/components/BeatBadge'

export default async function AuthorsPage() {
  let authors
  try {
    authors = await getAuthors()
  } catch (error) {
    authors = []
  }

  return (
    <div className="flex justify-center w-full px-4 py-8 lg:px-10">
      <div className="max-w-[1200px] w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Thought Leaders</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover authentic perspectives from industry experts, leaders, and innovators.
          </p>
        </div>

        {authors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author: any) => (
              <Link
                key={author.id}
                href={`/authors/${author.id}`}
                className="group flex flex-col p-6 rounded-xl bg-white dark:bg-surface-dark shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4 mb-4">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={72}
                      height={72}
                      className="w-[72px] h-[72px] rounded-full object-cover border-[3px] border-primary/30 group-hover:border-primary/50 transition-colors"
                    />
                  ) : (
                    <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-[3px] border-primary/30"></div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-black mb-1 group-hover:text-primary transition-colors dark:text-white">
                      {author.name}
                    </h3>
                    {author.title && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {author.title}
                      </p>
                    )}
                    {author.company && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {author.company}
                      </p>
                    )}
                  </div>
                </div>
                
                {author.industry && (
                  <div className="mb-3">
                    <BeatBadge 
                      beatSlug={author.industry.toLowerCase().replace(/\s+/g, '-')} 
                      size="sm" 
                    />
                  </div>
                )}

                {author.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                    {author.bio}
                  </p>
                )}

                {author.credentials && (
                  <p className="text-xs text-primary font-medium mt-auto">
                    {author.credentials}
                  </p>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-500 hover:text-primary transition-colors">
                    View Perspectives →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No authors found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
