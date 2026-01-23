import { getArticles } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { BeatBadge } from '@/components/BeatBadge'
import { INDUSTRY_BEATS } from '@/lib/beats'

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; beat?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const category = searchParams.category
  const beat = searchParams.beat

  let data
  try {
    data = await getArticles({ page, limit: 12, category, beat })
  } catch (error) {
    // Fallback if API fails
    data = { articles: [], pagination: { page: 1, limit: 12, total: 0, pages: 1 } }
  }

  return (
    <div className="flex justify-center w-full px-4 py-8 lg:px-10">
      <div className="max-w-[1200px] w-full">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Authored Articles</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            In-depth analysis, unfiltered opinions, and forward-looking perspectives from industry leaders.
          </p>
          
          {/* Beat Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Link
              href="/articles"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !beat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Beats
            </Link>
            {INDUSTRY_BEATS.map((beatItem) => (
              <Link
                key={beatItem.slug}
                href={`/articles?beat=${beatItem.slug}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  beat === beatItem.slug
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {beatItem.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.articles.map((article: any) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-surface-dark shadow-sm hover:shadow-md transition-shadow h-full"
            >
              <div className="relative h-56 overflow-hidden">
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
              <div className="flex flex-col flex-grow p-6">
                {article.category?.beat && (
                  <div className="mb-3">
                    <BeatBadge beatSlug={article.category.slug} size="sm" />
                  </div>
                )}
                <div className="flex items-start gap-3 mb-3">
                  {article.author.avatar ? (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover border-[3px] border-primary/30"
                    />
                  ) : (
                    <div className="size-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-[3px] border-primary/30"></div>
                  )}
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-base font-black text-gray-900 dark:text-white">
                      {article.author.name}
                    </p>
                    {(article.author.title || article.author.company) && (
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
                        {article.author.title}
                        {article.author.title && article.author.company && ' at '}
                        {article.author.company}
                      </p>
                    )}
                    {article.author.industry && (
                      <span className="text-xs text-primary font-medium mt-1 inline-block">{article.author.industry}</span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {article.readTime} min read
                  </span>
                  <span className="text-primary text-sm font-bold hover:underline">Read Article</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {data.pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map((pageNum) => {
              // Prioritize beat over category for consistency
              const filterParam = beat || category
              const filterQuery = filterParam ? `&beat=${filterParam}` : ''
              return (
                <Link
                  key={pageNum}
                  href={`/articles?page=${pageNum}${filterQuery}`}
                  className={`px-4 py-2 rounded-lg ${
                    page === pageNum
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
