'use client'

import Link from 'next/link'
import Image from 'next/image'

const insiderItems = [
  {
    id: 1,
    title: 'Behind the Algorithm: CEO Interview',
    category: 'Fintech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwPTdn9C3vYH6pJyM9JK5koSligzu7szeBIKwgUQ3WDkdgr2jS85hprDR4QeNBMMdQhO7wW4A2WrD2wliGg1iCX1QnO7Qpd0Glqjpz2k6V5LQg4KWugww1R4J6kP_zOa5jriZr6q7ZPJmxu6JrE22ebJfFf5E_mePv5XeMz6MmgNn_ODHCYKKyhMyqM78I7ycikKMWdhzG_xq-ekZ63RZ3OVP5qBcmn99BD8bBbfjN16gVRAHKCHWSj7vTEHhx5cAsWsD4I9QUt6s'
  },
  {
    id: 2,
    title: 'Scaling Empathy in Telehealth',
    category: 'Healthcare',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGb_l_TbMNhwFOL11yTTWJBfQt1GoEAcuc0OlWTfPFfUJQdUVfdh9-GN31WaXk-3kIrfjxOvC4WYe3bKmvDCD_DB9kdRKzwTe4cbqGc5RblDw_MHlb0B7EjbhTdw9akcfbrJRwNxpfTIXU90VlimkDtBvqbQ0I28lDfMl3UNqbfq2ZwwfnjbMhwkHCsEhXsxMhiUN8fixPch87B1bufnUYrvXJJewhP8cT9kvoQtOWM5RMxOoZyUUPxP4z8DAnJNZacx2TRy1a9aA'
  },
  {
    id: 3,
    title: 'The Revival of Brick and Mortar',
    category: 'Retail',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKP1PM89VTlResu4HL7eEdZyKaX4l-V1DIjqQJ9IVqKTRceHncnzTBzKGQyxbb8Hp51u9r7D71zbYjOnAnqeZTaE0acI-eLuwEWGgt0dX5uqlqqVBZDvPhCur90TYiCjmS051NHgDoaTFn8St5RL3RTx7kQGFD1JezCB7am_UYoMHWponpOY6z_Fum2QMX67Uph65yLas0BZmMG3iza59OtA5wOoNDkkGyapnmLXXIBHeHMUld4rPkdT3YcE76i9J_5j-9fdYIhhA'
  }
]

export function InsiderView() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold dark:text-white flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">visibility</span>
          The Insider View
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insiderItems.map((item) => (
          <Link key={item.id} href="/interviews" className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-md">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <span className="text-xs font-bold text-blue-300 uppercase mb-2 block">{item.category}</span>
              <h4 className="text-lg font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">
                {item.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
