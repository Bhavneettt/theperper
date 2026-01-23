'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="@container">
      <div className="relative w-full overflow-hidden rounded-2xl bg-surface-dark shadow-2xl group">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwPTdn9C3vYH6pJyM9JK5koSligzu7szeBIKwgUQ3WDkdgr2jS85hprDR4QeNBMMdQhO7wW4A2WrD2wliGg1iCX1QnO7Qpd0Glqjpz2k6V5LQg4KWugww1R4J6kP_zOa5jriZr6q7ZPJmxu6JrE22ebJfFf5E_mePv5XeMz6MmgNn_ODHCYKKyhMyqM78I7ycikKMWdhzG_xq-ekZ63RZ3OVP5qBcmn99BD8bBbfjN16gVRAHKCHWSj7vTEHhx5cAsWsD4I9QUt6s")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/90 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-start justify-center min-h-[500px] p-8 md:p-16 gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-white">The Daily Perspective</span>
          </div>
          <div className="max-w-2xl flex flex-col gap-6">
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-white drop-shadow-lg">
              Provoking Thoughts, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Inspiring Dialogue</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed drop-shadow-md">
              Authentic, unfiltered perspectives from industry thought leaders. Real opinions—not polished PR. The voices that challenge, provoke, and inspire change.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link href="/articles" className="flex items-center gap-2 h-14 px-8 rounded-lg bg-primary hover:bg-blue-600 text-white text-lg font-bold transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1">
              Explore Content
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link href="/contribute" className="flex items-center gap-2 h-14 px-8 rounded-lg bg-white/5 hover:bg-white/10 text-white text-lg font-medium backdrop-blur-md transition-all border border-white/10 hover:border-white/30">
              Become a Contributor
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
