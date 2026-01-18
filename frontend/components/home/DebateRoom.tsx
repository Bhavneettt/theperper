'use client'

import Link from 'next/link'

export function DebateRoom() {
  return (
    <section className="rounded-2xl bg-gray-50 dark:bg-surface-dark p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center size-10 rounded-full bg-red-500 text-white shadow-lg">
          <span className="material-symbols-outlined">gavel</span>
        </span>
        <div>
          <h3 className="text-2xl font-bold dark:text-white">The Debate Room</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Two experts, one topic, opposing views.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-12 rounded-full border-2 border-primary p-0.5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
            </div>
            <div>
              <h5 className="text-sm font-bold dark:text-white">Sarah Jenkins</h5>
              <span className="text-xs text-primary font-bold uppercase">Pro-Office</span>
            </div>
          </div>
          <h4 className="text-xl font-bold dark:text-white leading-tight">"Innovation Requires Presence"</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">Spontaneous collaboration cannot be scheduled. The office remains the engine of true creativity.</p>
          <Link href="/debates/remote-vs-office" className="mt-auto self-start text-sm font-bold text-primary hover:underline">Read Argument</Link>
        </div>
        <div className="relative flex items-center justify-center py-4 md:py-0">
          <div className="absolute inset-0 md:inset-x-[50%] md:w-px h-px md:h-full bg-gray-300 dark:bg-gray-600"></div>
          <span className="relative z-10 bg-white dark:bg-surface-dark px-2 text-sm font-black text-gray-400 uppercase tracking-widest">VS</span>
        </div>
        <div className="flex-1 flex flex-col gap-4 text-right md:items-end">
          <div className="flex items-center gap-3 mb-2 flex-row-reverse">
            <div className="size-12 rounded-full border-2 border-green-500 p-0.5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
            </div>
            <div>
              <h5 className="text-sm font-bold dark:text-white">Amara Okafor</h5>
              <span className="text-xs text-green-500 font-bold uppercase">Pro-Remote</span>
            </div>
          </div>
          <h4 className="text-xl font-bold dark:text-white leading-tight">"Asynchronous is the Future"</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">Deep work thrives in solitude. The office is a distraction factory that modern tools have made obsolete.</p>
          <Link href="/debates/remote-vs-office" className="mt-auto self-end text-sm font-bold text-green-500 hover:underline">Read Argument</Link>
        </div>
      </div>
    </section>
  )
}
