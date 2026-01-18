import { getEvent } from '@/lib/api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function EventPage({
  params,
}: {
  params: { slug: string }
}) {
  try {
    const event = await getEvent(params.slug)

    return (
      <article className="flex justify-center w-full px-4 py-8 lg:px-10">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="mb-8">
            <Link href="/events" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Events
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-xs font-bold uppercase">{event.category?.name}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">
                {new Date(event.startDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{event.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{event.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span>{event.isVirtual ? 'Virtual Event' : event.location}</span>
              </div>
              {event.capacity && (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">people</span>
                  <span>{event.registered} / {event.capacity} registered</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {event.imageUrl && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Registration Button */}
          <div className="mb-8">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg">
              Register for Event
            </button>
          </div>

          {/* Description */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
