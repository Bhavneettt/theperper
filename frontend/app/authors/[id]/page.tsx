import { getAuthor, getAuthorArticles } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { BeatBadge } from '@/components/BeatBadge'
import { notFound } from 'next/navigation'

export default async function AuthorPage({
  params,
}: {
  params: { id: string }
}) {
  let author
  let authorArticlesData
  
  try {
    author = await getAuthor(params.id)
    authorArticlesData = await getAuthorArticles(params.id, { limit: 12 })
  } catch (error) {
    notFound()
  }

  const authorArticles = authorArticlesData?.articles || []

  return (
    <div className="flex justify-center w-full px-4 py-8 lg:px-10">
      <div className="max-w-4xl w-full">
        {/* Author Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-primary/20"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-4 border-primary/30 shadow-lg"></div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-black mb-3">{author.name}</h1>
              {author.title && (
                <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">{author.title}</p>
              )}
              {author.company && (
                <p className="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-400 mb-4">at {author.company}</p>
              )}
              {author.industry && (
                <BeatBadge beatSlug={author.industry.toLowerCase().replace(/\s+/g, '-')} size="md" className="mb-4" />
              )}
              {author.credentials && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{author.credentials}</p>
              )}
              {author.bio && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{author.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Their Perspective Section */}
        <div className="mb-12 p-6 bg-primary/5 border-l-4 border-primary rounded-r">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            Their Perspective
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {author.name} brings {author.credentials || 'extensive experience'} to The Perspective, 
            offering authentic insights from {author.industry || 'their industry'}. 
            Their perspectives challenge conventional thinking and inspire meaningful dialogue.
          </p>
        </div>

        {/* Author's Contributions */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Contributions</h2>
          {authorArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {authorArticles.map((article: any) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-surface-dark shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    {article.category?.slug && (
                      <BeatBadge beatSlug={article.category.slug} size="sm" />
                    )}
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {article.readTime} min read
                      </span>
                      <span className="text-primary text-xs font-bold">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No contributions yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
