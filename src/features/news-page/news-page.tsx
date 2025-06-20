import { Link, useParams } from 'react-router-dom'
import { useNews } from '@/shared/hooks/use-news.ts'
import { Error404 } from '@/shared/ui/error-404.tsx'
import { ROUTES } from '@/shared/types/routes.ts'
import { Button } from '@/shared/ui/button.tsx'
import { useMemo } from 'react'

export const NewsPage = () => {
  const { newsId } = useParams<{ newsId: string }>()
  const { newsList } = useNews()

  const newsItem = useMemo(() => {
    return newsList.find(news => news.id === newsId)
  }, [newsList, newsId])

  if (!newsItem || !newsId) {
    return <Error404 />
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">{newsItem.title}</h2>
      {newsItem.image && (
        <img
          src={newsItem.image}
          alt="News"
          className="max-w-[60%] md:max-w-[25%] object-contain rounded-lg"
        />
      )}
      <p className="text-gray-700 dark:text-gray-300">{newsItem.content}</p>
      <span className="text-sm text-gray-500 dark:text-gray-400">{newsItem.date}</span>
      <Link to={ROUTES.HOME}>
        <Button>Go Back Home</Button>
      </Link>
    </div>
  )
}
