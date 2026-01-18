import { getEvents } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; type?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const category = searchParams.category
  const eventType = searchParams.type

  let data
  try {
    data = await getEvents({ page, limit: 12, category, type: eventType, upcoming: true })
  } catch (error) {
    // Fallback if API fails
    data = { events: [], pagination: { page: 1, limit: 12, total: 0, pages: 1 } }
  }

  return (
    <div className="flex justify-center w-full px-4 py-8 lg:px-10">
      <div className="max-w-[1400px] w-full">
        {/* Hero Section */}
        <section className="mb-10 w-full rounded-xl overflow-hidden relative isolate group">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKiqXbczh2IaV2dYit9eDwPcNBFnhE7X7KJTn4j9gjAqza9J6QDRB8_fAC29PJ9_pfcKCaWWLsam3IvCpNv5eYeKnSnHD7SN1miojde5Z63kigQ_tqEzsCOTrK26Dd-vl2HBfl72Q-n9TAK2_ukpws7yHZTIpYqIJtfORldstcbYhKtGowFSeufo6W41LaOzRmhtx0IGb9hEEDmgidszdjtfeq4EQKAXrxTs_5jxslvMM4K2JTk5dsIvvbPx7_cJ0-gaEFEiMUvcE")'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
          </div>
          <div className="relative z-10 p-8 md:p-16 flex flex-col items-start justify-end min-h-[480px] max-w-4xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px]">star</span> Featured Event
            </span>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4 drop-shadow-sm">
              The Perspective Annual Summit 2024
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8 drop-shadow-sm">
              Join industry thought leaders for a weekend of insight, debate, and innovation. Exploring the intersection of technology and humanity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 h-12 px-8 bg-primary hover:bg-blue-600 text-white rounded-lg text-base font-bold transition-all shadow-lg shadow-blue-900/20">
                Register Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <div className="flex items-center gap-4 px-6 h-12 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-white">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  <span className="font-medium">Oct 24-26</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <span className="font-medium">New York City</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-[65px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md py-4 mb-8 -mx-4 px-4 md:-mx-10 md:px-10 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            <Link
              href="/events"
              className={`flex shrink-0 items-center justify-center gap-2 px-4 h-9 rounded-full text-sm font-bold transition-transform active:scale-95 ${
                !eventType
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-[#233648] hover:bg-gray-100 dark:hover:bg-[#2d465e] border border-gray-200 dark:border-transparent text-slate-700 dark:text-white'
              }`}
            >
              All Events
            </Link>
            <Link
              href="/events?type=CONFERENCE"
              className={`flex shrink-0 items-center justify-center gap-2 px-4 h-9 rounded-full text-sm font-medium transition-colors ${
                eventType === 'CONFERENCE'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-[#233648] hover:bg-gray-100 dark:hover:bg-[#2d465e] border border-gray-200 dark:border-transparent text-slate-700 dark:text-white'
              }`}
            >
              Conferences
            </Link>
            <Link
              href="/events?type=WEBINAR"
              className={`flex shrink-0 items-center justify-center gap-2 px-4 h-9 rounded-full text-sm font-medium transition-colors ${
                eventType === 'WEBINAR'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-[#233648] hover:bg-gray-100 dark:hover:bg-[#2d465e] border border-gray-200 dark:border-transparent text-slate-700 dark:text-white'
              }`}
            >
              Webinars
            </Link>
            <Link
              href="/events?type=WORKSHOP"
              className={`flex shrink-0 items-center justify-center gap-2 px-4 h-9 rounded-full text-sm font-medium transition-colors ${
                eventType === 'WORKSHOP'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-[#233648] hover:bg-gray-100 dark:hover:bg-[#2d465e] border border-gray-200 dark:border-transparent text-slate-700 dark:text-white'
              }`}
            >
              Workshops
            </Link>
          </div>
        </section>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.events.map((event: any) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group flex flex-col rounded-xl bg-white dark:bg-[#192633] overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-transparent h-full"
            >
              <div className="h-48 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500">
                {event.imageUrl ? (
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider">
                    {event.category?.name || 'Event'}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 dark:text-[#92adc9] text-xs">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-slate-600 dark:text-[#92adc9] text-sm leading-relaxed line-clamp-2">
                  {event.description}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-white/5">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {event.isVirtual ? 'Virtual' : event.location}
                  </span>
                  <span className="text-slate-900 dark:text-white text-sm font-bold hover:text-primary flex items-center gap-1">
                    Details <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {data.pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/events?page=${pageNum}${category ? `&category=${category}` : ''}${eventType ? `&type=${eventType}` : ''}`}
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
