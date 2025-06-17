import { ScrollToTopButton } from '@/shared/ui/scroll-button.tsx'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'
import { OneNewsBlock } from '@/features/one-news-block.tsx'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/types/routes.ts'
import { Button } from '@/shared/ui/button.tsx'

export const NewsList = () => {
  const { newsList } = useLocalStorageNews()
  return (
    <div className="flex flex-col mt-3 mx-auto relative">
      <Link className="self-end sticky top-4 right-4" to={ROUTES.ADD}>
        <Button variant={'created'}>Add news</Button>
      </Link>
      <ul className="space-y-8">
        {newsList?.map(newsItem => <OneNewsBlock newsItem={newsItem} />)}
      </ul>
      <ScrollToTopButton />
    </div>
  )
}
