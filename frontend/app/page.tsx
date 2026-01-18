import { Hero } from '@/components/home/Hero'
import { FeaturedPerspectives } from '@/components/home/FeaturedPerspectives'
import { DebateRoom } from '@/components/home/DebateRoom'
import { InsiderView } from '@/components/home/InsiderView'
import { Sidebar } from '@/components/home/Sidebar'

export default async function Home() {
  return (
    <div className="flex justify-center w-full px-4 py-8 lg:px-10">
      <div className="max-w-[1200px] w-full flex flex-col gap-16">
        <Hero />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 flex flex-col gap-16">
            <FeaturedPerspectives />
            <DebateRoom />
            <InsiderView />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
