import { getArticle } from '@/lib/api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-xs font-bold uppercase">{article.category?.name}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">{article.readTime} min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{article.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{article.excerpt}</p>
            <div className="flex items-center gap-4">
              {article.author?.avatar && (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-bold">By {article.author?.name || 'Editor'}</p>
                {article.author?.bio && <p className="text-sm text-gray-500">{article.author.bio}</p>}
              </div>
            </div>
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
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
