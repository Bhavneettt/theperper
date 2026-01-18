import { getInterview } from '@/lib/api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function InterviewPage({
  params,
}: {
  params: { slug: string }
}) {
  try {
    const interview = await getInterview(params.slug)

    return (
      <article className="flex justify-center w-full px-4 py-8 lg:px-10">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="mb-8">
            <Link href="/interviews" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Interviews
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-xs font-bold uppercase">{interview.category?.name}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">
                {new Date(interview.publishedAt).toLocaleDateString()}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">{interview.readTime} min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{interview.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{interview.excerpt}</p>
            <div className="flex items-center gap-4">
              {interview.interviewer?.avatar && (
                <Image
                  src={interview.interviewer.avatar}
                  alt={interview.interviewer.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-bold">Interviewed by {interview.interviewer?.name || 'Editor'}</p>
                <p className="text-sm text-gray-500">With {interview.interviewee}</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {interview.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={interview.imageUrl}
                alt={interview.title}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: interview.content }}
          />
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
