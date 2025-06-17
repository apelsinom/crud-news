import { ScrollToTopButton } from '@/shared/ui/scroll-button.tsx'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'
import { Button } from '@/shared/ui/button.tsx'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/types/routes.ts'

export const NewsList = () => {
  const { newsList, deleteNews } = useLocalStorageNews()
  return (
    <div className="px-4 py-8 mx-auto">
      <ul className="space-y-8">
        {newsList?.map(news => (
          <li key={news?.id}>
            <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
            <img src="/news.svg" alt="News" className="w-20 h-20 object-contain mb-4" />
            <p className="text-gray-700 dark:text-gray-300 mb-2">{news.content}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">{news.date}</span>
            <div>
              <Button variant={'primary'}>
                <Link to={`${ROUTES.EDIT}/:${news.id}`}>Edit news</Link>
              </Button>
              <Button onClick={() => deleteNews(news.id)} variant={'danger'}>
                Delete news
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <ScrollToTopButton />
    </div>
  )
}
