import { getInterviews } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'

export default async function InterviewsPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const category = searchParams.category

  let data
  try {
    data = await getInterviews({ page, limit: 12, category })
  } catch (error) {
    // Fallback if API fails
    data = { interviews: [], pagination: { page: 1, limit: 12, total: 0, pages: 1 } }
  }

  return (
    <div className="flex justify-center w-full px-4 py-8 lg:px-10">
      <div className="max-w-[1200px] w-full">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Cover Story
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-[1.1] tracking-tight">
                The Visionary: Elena Rodriguez, CEO of Horizon
              </h1>
              <blockquote className="pl-4 border-l-4 border-primary/50 text-xl sm:text-2xl italic text-gray-600 dark:text-gray-300 font-display">
                "Innovation is not just about technology, it's about culture. We are building the future by empowering the people who build it."
              </blockquote>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/interviews/elena-rodriguez" className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/25 flex items-center gap-2">
                  Read Full Story
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link href="/podcasts" className="px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/5 font-bold rounded-lg transition-all">
                  Listen to Podcast
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-[45%]">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
                <div className="absolute bottom-6 left-6 z-20 text-white">
                  <p className="font-sans text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Photographed by</p>
                  <p className="font-display italic">Sarah Jenkins</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <div className="sticky top-16 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-y border-gray-200 dark:border-gray-800 mb-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
            <Link
              href="/interviews"
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Interviews
            </Link>
            <Link
              href="/interviews?category=executive-coaching"
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'executive-coaching'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Executive Coaching
            </Link>
            <Link
              href="/interviews?category=team-management"
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'team-management'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Team Management
            </Link>
            <Link
              href="/interviews?category=emotional-intelligence"
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'emotional-intelligence'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Emotional Intelligence
            </Link>
            <Link
              href="/interviews?category=crisis-communication"
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'crisis-communication'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Crisis Communication
            </Link>
          </div>
        </div>

        {/* Interviews Grid */}
        <div className="mb-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-display font-bold">Latest Conversations</h2>
            <Link href="/interviews" className="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4 flex items-center gap-1">
              View Archive <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {data.interviews.map((interview: any) => (
              <Link
                key={interview.id}
                href={`/interviews/${interview.slug}`}
                className="group cursor-pointer flex flex-col gap-4"
              >
                <div className="w-full aspect-[4/3] overflow-hidden rounded-lg relative">
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded">
                    {interview.category?.name || 'Interview'}
                  </div>
                  {interview.imageUrl ? (
                    <Image
                      src={interview.imageUrl}
                      alt={interview.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <span>{interview.category?.name || 'Interview'}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span>{interview.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold font-display leading-tight group-hover:text-primary transition-colors">
                    {interview.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {interview.excerpt}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {interview.interviewer?.avatar && (
                      <Image
                        src={interview.interviewer.avatar}
                        alt={interview.interviewer.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span className="text-xs font-medium text-gray-500">By {interview.interviewer?.name || 'Editor'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {data.pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/interviews?page=${pageNum}${category ? `&category=${category}` : ''}`}
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
    </div>
  )
}
