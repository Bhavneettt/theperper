import { getPodcasts } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'

export default async function PodcastsPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const category = searchParams.category

  let data
  try {
    data = await getPodcasts({ page, limit: 12, category })
  } catch (error) {
    // Fallback if API fails
    data = { podcasts: [], pagination: { page: 1, limit: 12, total: 0, pages: 1 } }
  }

  return (
    <div className="flex justify-center w-full px-4 py-8 lg:px-10">
      <div className="max-w-[1200px] w-full flex flex-col gap-10">
        {/* Hero Section */}
        <section className="@container">
          <div className="relative w-full overflow-hidden rounded-2xl bg-surface-dark shadow-xl">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwPTdn9C3vYH6pJyM9JK5koSligzu7szeBIKwgUQ3WDkdgr2jS85hprDR4QeNBMMdQhO7wW4A2WrD2wliGg1iCX1QnO7Qpd0Glqjpz2k6V5LQg4KWugww1R4J6kP_zOa5jriZr6q7ZPJmxu6JrE22ebJfFf5E_mePv5XeMz6MmgNn_ODHCYKKyhMyqM78I7ycikKMWdhzG_xq-ekZ63RZ3OVP5qBcmn99BD8bBbfjN16gVRAHKCHWSj7vTEHhx5cAsWsD4I9QUt6s")'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-start justify-end min-h-[480px] p-6 md:p-12 gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">mic</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Featured Episode</span>
              </div>
              <div className="max-w-3xl flex flex-col gap-4">
                <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-lg">
                  Leading Through Uncertainty
                </h1>
                <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl drop-shadow-md">
                  In this exclusive episode, we sit down with industry leaders to discuss navigating complex organizational changes during global crises.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <button className="flex items-center gap-2 h-12 px-6 rounded-lg bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all shadow-lg hover:shadow-primary/25">
                  <span className="material-symbols-outlined">play_arrow</span>
                  Play Latest Episode
                </button>
                <button className="flex items-center gap-2 h-12 px-6 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-medium backdrop-blur-md transition-all border border-white/10">
                  <span className="material-symbols-outlined">add</span>
                  Add to Library
                </button>
                <span className="text-sm text-gray-400 ml-2 font-medium">45 min • Released today</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Category Filters */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              <Link
                href="/podcasts"
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${
                  !category
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-surface-dark hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-sm font-medium">All Episodes</span>
              </Link>
              <Link
                href="/podcasts?category=crisis-management"
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${
                  category === 'crisis-management'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-surface-dark hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-sm font-medium">Crisis Management</span>
              </Link>
              <Link
                href="/podcasts?category=future-of-work"
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${
                  category === 'future-of-work'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-surface-dark hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-sm font-medium">Future of Work</span>
              </Link>
              <Link
                href="/podcasts?category=culture"
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${
                  category === 'culture'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-surface-dark hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-sm font-medium">Culture</span>
              </Link>
              <Link
                href="/podcasts?category=innovation"
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${
                  category === 'innovation'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-surface-dark hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-sm font-medium">Innovation</span>
              </Link>
            </div>

            {/* Podcasts List */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Latest Episodes</h3>
                <Link href="/podcasts" className="text-primary text-sm font-medium hover:underline">View All</Link>
              </div>
              {data.podcasts.map((podcast: any) => (
                <Link
                  key={podcast.id}
                  href={`/podcasts/${podcast.slug}`}
                  className="group flex flex-col sm:flex-row gap-5 p-4 rounded-xl bg-white dark:bg-surface-dark/50 hover:bg-gray-50 dark:hover:bg-surface-dark border border-transparent dark:border-white/5 hover:border-gray-200 dark:hover:border-primary/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative shrink-0 w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-800">
                    {podcast.imageUrl ? (
                      <Image
                        src={podcast.imageUrl}
                        alt={podcast.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <span className="material-symbols-outlined">play_arrow</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-1 gap-2">
                    <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-wide">
                      <span>{podcast.category?.name || 'Podcast'}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {new Date(podcast.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {podcast.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{podcast.description}</p>
                    <div className="mt-1 flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span> {podcast.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">person</span> Host: {podcast.host?.name || 'Editor'}
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col justify-center items-end gap-2">
                    <button className="size-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-300">
                      <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
                    </button>
                    <button className="size-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-300">
                      <span className="material-symbols-outlined text-[20px]">share</span>
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {data.pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/podcasts?page=${pageNum}${category ? `&category=${category}` : ''}`}
                    className={`px-4 py-2 rounded-lg ${
                      page === pageNum
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8 h-full">
            <div className="p-6 rounded-xl bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-transparent">
              <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                <span className="material-symbols-outlined text-primary">mail</span>
                <h3 className="text-lg font-bold">Never miss an insight</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                Get the latest leadership strategies and episode recaps delivered straight to your inbox every Tuesday.
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  className="w-full rounded-lg bg-white dark:bg-[#1a2938] border-gray-200 dark:border-gray-700 text-sm px-4 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm py-2.5 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
