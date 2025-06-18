import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/types/routes.ts'
import { Button } from '@/shared/ui/button.tsx'
import type { NewsType } from '@/shared/types/news.ts'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'

type Props = {
  newsItem: NewsType
}

export const OneNewsBlock = ({ newsItem }: Props) => {
  const { deleteNews } = useLocalStorageNews()

  return (
    <li className="flex flex-col gap-2 pb-5 border-b border-gray-200" key={newsItem?.id}>
      <h2 className="text-xl md:text-2xl font-semibold leading-tight">{newsItem.title}</h2>
      <img src="/news.svg" alt="News" className="w-20 h-20 object-contain" />
      <p className="text-sm md:text-xl line-clamp-3 text-gray-700 dark:text-gray-300">
        {newsItem.content}
      </p>
      <span className="text-sm text-gray-500 dark:text-gray-400">{newsItem.date}</span>
      <div className="flex gap-1 justify-between sm:justify-start sm:gap-10">
        <Link to={`${ROUTES.NEWS}/${newsItem.id}`}>
          <Button>Show news</Button>
        </Link>
        <Link to={`${ROUTES.EDIT}/${newsItem.id}`}>
          <Button variant={'primary'}>Edit news</Button>
        </Link>
        <Button onClick={() => deleteNews(newsItem.id)} variant={'danger'}>
          Delete news
        </Button>
      </div>
    </li>
  )
}
