import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import clsx from 'clsx'

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        'fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-opacity z-50',
        'bg-gray-200 text-black hover:bg-gray-300',
        'dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
