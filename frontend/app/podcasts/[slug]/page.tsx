import { getPodcast } from '@/lib/api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function PodcastPage({
  params,
}: {
  params: { slug: string }
}) {
  try {
    const podcast = await getPodcast(params.slug)

    return (
      <article className="flex justify-center w-full px-4 py-8 lg:px-10">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="mb-8">
            <Link href="/podcasts" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Podcasts
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-xs font-bold uppercase">{podcast.category?.name}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">
                {new Date(podcast.publishedAt).toLocaleDateString()}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">{podcast.duration} min</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{podcast.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{podcast.description}</p>
            <div className="flex items-center gap-4">
              {podcast.host?.avatar && (
                <Image
                  src={podcast.host.avatar}
                  alt={podcast.host.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-bold">Hosted by {podcast.host?.name || 'Editor'}</p>
                {podcast.guestId && <p className="text-sm text-gray-500">Guest: {podcast.guestId}</p>}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {podcast.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={podcast.imageUrl}
                alt={podcast.title}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Audio Player */}
          {podcast.audioUrl && (
            <div className="mb-8 p-6 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700">
              <audio controls className="w-full">
                <source src={podcast.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Description */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: podcast.description }}
          />
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
