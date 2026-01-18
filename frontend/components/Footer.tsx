import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-transparent mt-12 py-12">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white">
            <div className="size-6">
              <svg className="text-primary w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold">The Perspective</h2>
          </div>
          <p className="text-sm text-gray-500 max-w-xs">Empowering leaders with the insights they need to shape the future.</p>
        </div>
        <div className="flex gap-8 md:gap-16">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Content</h4>
            <Link href="/articles" className="text-sm text-gray-500 hover:text-primary">Articles</Link>
            <Link href="/podcasts" className="text-sm text-gray-500 hover:text-primary">Podcasts</Link>
            <Link href="/events" className="text-sm text-gray-500 hover:text-primary">Newsletters</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Company</h4>
            <Link href="/about" className="text-sm text-gray-500 hover:text-primary">About Us</Link>
            <Link href="/careers" className="text-sm text-gray-500 hover:text-primary">Careers</Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-primary">Contact</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Social</h4>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary">LinkedIn</Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-primary">Twitter</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
