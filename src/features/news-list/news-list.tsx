import { ScrollToTopButton } from '@/shared/ui/scroll-button.tsx'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'
import { OneNewsBlock } from '@/features/news-list/one-news-block.tsx'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/types/routes.ts'
import { Button } from '@/shared/ui/button.tsx'
import { NoNewsPage } from '@/features/news-list/no-news-page.tsx'

export const NewsList = () => {
  const { newsList, setNewsList, deleteNews } = useLocalStorageNews()

  const handleDelete = (id: string) => {
    deleteNews(id)
    setNewsList(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="flex flex-col mt-1 sm:mt-3 mx-auto relative">
      <Link className="self-end sticky top-4 right-4" to={ROUTES.ADD}>
        <Button variant={'created'}>Add news</Button>
      </Link>

      {newsList.length === 0 ? (
        <NoNewsPage />
      ) : (
        <ul className="space-y-8">
          {newsList?.map(newsItem => (
            <OneNewsBlock key={newsItem.id} newsItem={newsItem} onDelete={handleDelete} />
          ))}
        </ul>
      )}

      <ScrollToTopButton />
    </div>
  )
}
