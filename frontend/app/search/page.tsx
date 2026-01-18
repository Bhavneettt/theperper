'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { search } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query) {
      setLoading(true)
      search(query)
        .then((data) => {
          setResults(data)
        })
        .catch((error) => {
          console.error('Search failed:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [query])

  if (!query) {
    return (
      <div className="flex justify-center w-full px-4 py-8 lg:px-10">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-4xl font-bold mb-4">Search</h1>
          <p className="text-gray-600 dark:text-gray-300">Enter a search query to find content.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center w-full px-4 py-8 lg:px-10">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-4xl font-bold mb-4">Searching...</h1>
        </div>
      </div>
    )
  }

  if (!results) {
    return null
  }

  return (
    <div className="flex justify-center w-full px-4 py-8 lg:px-10">
      <div className="max-w-[1200px] w-full">
        <h1 className="text-4xl font-bold mb-4">
          Search Results for &quot;{query}&quot;
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Found {results.total} results
        </p>

        {results.results.articles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Articles</h2>
            <div className="space-y-4">
              {results.results.articles.map((article: any) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="block p-4 rounded-lg bg-white dark:bg-surface-dark hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2 hover:text-primary">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.results.interviews.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Interviews</h2>
            <div className="space-y-4">
              {results.results.interviews.map((interview: any) => (
                <Link
                  key={interview.id}
                  href={`/interviews/${interview.slug}`}
                  className="block p-4 rounded-lg bg-white dark:bg-surface-dark hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2 hover:text-primary">{interview.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{interview.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.results.podcasts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Podcasts</h2>
            <div className="space-y-4">
              {results.results.podcasts.map((podcast: any) => (
                <Link
                  key={podcast.id}
                  href={`/podcasts/${podcast.slug}`}
                  className="block p-4 rounded-lg bg-white dark:bg-surface-dark hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2 hover:text-primary">{podcast.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{podcast.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.results.events.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Events</h2>
            <div className="space-y-4">
              {results.results.events.map((event: any) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="block p-4 rounded-lg bg-white dark:bg-surface-dark hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2 hover:text-primary">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.total === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No results found for &quot;{query}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
