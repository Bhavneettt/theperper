'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const { toggleTheme } = useTheme()

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center justify-center rounded-lg size-10 bg-gray-100 dark:bg-surface-dark text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-opacity-80 transition-colors"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-[20px]">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 z-50 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="flex flex-col p-4">
              {/* Industry Stories */}
              <div className="border-b border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => toggleSection('industry')}
                  className="w-full px-4 py-3 text-sm font-medium hover:text-primary transition-colors flex items-center justify-between"
                >
                  Industry Stories
                  <span className="material-symbols-outlined text-[16px]">
                    {expandedSection === 'industry' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSection === 'industry' && (
                  <div className="pl-4 pb-2 space-y-2">
                    <Link href="/articles?category=tech" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Tech</Link>
                    <Link href="/articles?category=gcc" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">GCC</Link>
                    <Link href="/articles?category=hr" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">HR</Link>
                    <Link href="/articles?category=healthcare" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Healthcare</Link>
                    <Link href="/articles?category=automobile" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Automobile</Link>
                    <Link href="/articles?category=ev" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">EV</Link>
                    <Link href="/articles?category=education" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Education/EdTech</Link>
                    <Link href="/articles?category=lifestyle" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Lifestyle</Link>
                    <Link href="/articles?category=am" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">A&M</Link>
                  </div>
                )}
              </div>

              {/* Authored Articles */}
              <div className="border-b border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => toggleSection('articles')}
                  className="w-full px-4 py-3 text-sm font-medium hover:text-primary transition-colors flex items-center justify-between"
                >
                  Authored Articles
                  <span className="material-symbols-outlined text-[16px]">
                    {expandedSection === 'articles' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSection === 'articles' && (
                  <div className="pl-4 pb-2 space-y-2">
                    <Link href="/articles?category=leadership-cxo" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Leadership & CXO Views</Link>
                    <Link href="/articles?category=expert-opinions" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Expert Opinions</Link>
                    <Link href="/articles?category=thought-leadership" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Thought Leadership</Link>
                    <Link href="/articles?category=market-insights" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Market Insights</Link>
                    <Link href="/articles?category=policy-regulations" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Policy & Regulations</Link>
                    <Link href="/articles?category=innovation-trends" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Innovation & Trends</Link>
                    <Link href="/articles?category=startup-perspectives" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Startup Perspectives</Link>
                  </div>
                )}
              </div>

              {/* Interviews */}
              <div className="border-b border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => toggleSection('interviews')}
                  className="w-full px-4 py-3 text-sm font-medium hover:text-primary transition-colors flex items-center justify-between"
                >
                  Interviews
                  <span className="material-symbols-outlined text-[16px]">
                    {expandedSection === 'interviews' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSection === 'interviews' && (
                  <div className="pl-4 pb-2 space-y-2">
                    <Link href="/interviews?category=cxo-interviews" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">CXO Interviews</Link>
                    <Link href="/interviews?category=founder-stories" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Founder Stories</Link>
                    <Link href="/interviews?category=hr-leaders" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">HR Leaders Speak</Link>
                    <Link href="/interviews?category=tech-leaders" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Tech Leaders</Link>
                    <Link href="/interviews?category=women-leadership" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Women in Leadership</Link>
                    <Link href="/interviews?category=startup-sme" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Startup & SME Voices</Link>
                  </div>
                )}
              </div>

              {/* Events */}
              <div className="border-b border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => toggleSection('events')}
                  className="w-full px-4 py-3 text-sm font-medium hover:text-primary transition-colors flex items-center justify-between"
                >
                  Events
                  <span className="material-symbols-outlined text-[16px]">
                    {expandedSection === 'events' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSection === 'events' && (
                  <div className="pl-4 pb-2 space-y-2">
                    <Link href="/events?type=conference" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Conferences & Summits</Link>
                    <Link href="/events?type=webinar" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Webinars</Link>
                    <Link href="/events?type=workshop" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Workshops</Link>
                    <Link href="/events?type=product-launch" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Product Launches</Link>
                    <Link href="/events?type=industry-meet" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Industry Meets</Link>
                    <Link href="/events?type=award-ceremony" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Award Ceremonies</Link>
                  </div>
                )}
              </div>

              {/* Podcasts */}
              <div className="border-b border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => toggleSection('podcasts')}
                  className="w-full px-4 py-3 text-sm font-medium hover:text-primary transition-colors flex items-center justify-between"
                >
                  Podcasts
                  <span className="material-symbols-outlined text-[16px]">
                    {expandedSection === 'podcasts' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedSection === 'podcasts' && (
                  <div className="pl-4 pb-2 space-y-2">
                    <Link href="/podcasts?category=leadership-talks" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Leadership Talks</Link>
                    <Link href="/podcasts?category=tech-bytes" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Tech Bytes</Link>
                    <Link href="/podcasts?category=hr-conversations" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">HR Conversations</Link>
                    <Link href="/podcasts?category=startup-stories" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Startup Stories</Link>
                    <Link href="/podcasts?category=marketing-branding" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Marketing & Branding</Link>
                    <Link href="/podcasts?category=future-of-work" onClick={() => setIsOpen(false)} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Future of Work</Link>
                  </div>
                )}
              </div>

              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                  <span className="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
                  Toggle Theme
                </button>
              </div>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium bg-primary text-white rounded-lg text-center mt-2"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
