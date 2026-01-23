import { getArticle } from '@/lib/api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { BeatBadge } from '@/components/BeatBadge'
import { ContentTypeIcon } from '@/components/ContentTypeIcon'
import { OpinionIndicator } from '@/components/OpinionIndicator'

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  try {
    const article = await getArticle(params.slug)

    return (
      <article className="flex justify-center w-full px-4 py-8 lg:px-10">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="mb-8">
            <Link href="/articles" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Articles
            </Link>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {article.category?.slug && (
                <BeatBadge beatSlug={article.category.slug} size="md" />
              )}
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">{article.readTime} min read</span>
              {article.contentType && (
                <>
                  <span className="text-gray-400">•</span>
                  <ContentTypeIcon contentType={article.contentType} size="sm" showLabel />
                </>
              )}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <OpinionIndicator 
                type={article.contentType === 'DEBATE_ROOM' ? 'debate' : article.contentType === 'INSIDER_VIEW' ? 'opinion' : 'perspective'} 
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{article.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{article.excerpt}</p>
            <div className="flex items-start gap-6">
              {article.author?.avatar ? (
                <Link href={`/authors/${article.author.id}`}>
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={80}
                    height={80}
                    className="size-20 rounded-full border-[3px] border-primary/30 hover:border-primary/50 transition-colors cursor-pointer object-cover"
                  />
                </Link>
              ) : (
                <div className="size-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-[3px] border-primary/30"></div>
              )}
              <div className="flex-1">
                <Link href={`/authors/${article.author?.id}`} className="hover:text-primary transition-colors">
                  <p className="font-black text-xl md:text-2xl mb-1">{article.author?.name || 'Editor'}</p>
                </Link>
                {(article.author?.title || article.author?.company) && (
                  <p className="text-base font-semibold text-gray-700 dark:text-gray-300 mt-1">
                    {article.author.title}
                    {article.author.title && article.author.company && ' at '}
                    {article.author.company}
                  </p>
                )}
                {article.author?.industry && (
                  <span className="text-xs text-primary font-medium mt-1 inline-block">{article.author.industry}</span>
                )}
                {article.author?.bio && (
                  <p className="text-sm text-gray-500 mt-2">{article.author.bio}</p>
                )}
              </div>
            </div>
            {article.editorNote && (
              <div className="mt-6 bg-primary/5 border-l-4 border-primary p-4 rounded-r">
                <p className="text-xs font-bold text-primary uppercase mb-2">Why This Matters</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{article.editorNote}</p>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Counterpoint Available Badge */}
          {article.debateTopicId && article.DebateTopic && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-red-600 text-sm">balance</span>
                <span className="text-xs font-bold text-red-600 uppercase">Counterpoint Available</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                This perspective is part of a debate. Explore opposing viewpoints on this topic.
              </p>
              <Link
                href={`/debates/${article.DebateTopic.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700"
              >
                View Debate
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          )}

          {/* Related Articles from Debate */}
          {article.DebateTopic && article.DebateTopic.articles && article.DebateTopic.articles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Other Perspectives on This Topic</h3>
              <div className="space-y-4">
                {article.DebateTopic.articles
                  .filter((a: any) => a.id !== article.id)
                  .slice(0, 2)
                  .map((relatedArticle: any) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/articles/${relatedArticle.slug}`}
                      className="block p-4 bg-gray-50 dark:bg-surface-dark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {relatedArticle.author?.avatar && (
                          <Image
                            src={relatedArticle.author.avatar}
                            alt={relatedArticle.author.name}
                            width={32}
                            height={32}
                            className="size-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-bold dark:text-white">{relatedArticle.author?.name}</p>
                          {relatedArticle.author?.title && (
                            <p className="text-xs text-gray-500">{relatedArticle.author.title}</p>
                          )}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold mb-1 hover:text-primary transition-colors dark:text-white">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
