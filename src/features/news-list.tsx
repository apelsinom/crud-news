import { ScrollToTopButton } from '@/shared/ui/scroll-button.tsx'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'
import { Button } from '@/shared/ui/button.tsx'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/types/routes.ts'

export const NewsList = () => {
  const { newsList, deleteNews } = useLocalStorageNews()
  return (
    <div className="flex flex-col mt-3 mx-auto">
      <ul className="space-y-8">
        {newsList?.map(news => (
          <li className="flex flex-col gap-2 pb-5 border-b border-gray-200" key={news?.id}>
            <h2 className="text-xl font-semibold">{news.title}</h2>
            <img src="/news.svg" alt="News" className="w-20 h-20 object-contain" />
            <p className="text-gray-700 dark:text-gray-300">{news.content}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">{news.date}</span>
            <div className="flex gap-10">
              <Link to={`${ROUTES.NEWS}/${news.id}`}>
                <Button>Show news</Button>
              </Link>
              <Link to={`${ROUTES.EDIT}/${news.id}`}>
                <Button variant={'primary'}>Edit news</Button>
              </Link>
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
