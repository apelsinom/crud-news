import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/button.tsx'
import type { NewsType } from '@/shared/types/news-type.ts'
import { useState } from 'react'
import { DeleteModal } from '@/shared/ui/delete-modal.tsx'

type Props = {
  newsItem: NewsType
  onDelete: (id: string) => void
}

export const OneNewsBlock = ({ newsItem, onDelete }: Props) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  return (
    <li className="flex flex-col gap-2 pt-3 md:pt-5 border-t border-gray-200">
      <h2 className="text-xl md:text-2xl font-semibold leading-tight">{newsItem.title}</h2>
      {newsItem.image && (
        <Link to={`/${newsItem.id}`}>
          <img
            src={newsItem.image}
            alt="News"
            className="max-w-[60%] md:max-w-[25%] object-contain rounded-lg"
          />
        </Link>
      )}
      <p className="text-sm md:text-xl line-clamp-3 text-gray-700 dark:text-gray-300">
        {newsItem.content}
      </p>
      <span className="text-sm text-gray-500 dark:text-gray-400">{newsItem.date}</span>
      <div className="flex gap-1 justify-between sm:justify-start sm:gap-10">
        <Link to={`/${newsItem.id}`}>
          <Button>Show news</Button>
        </Link>
        <Link to={`/${newsItem.id}/edit`}>
          <Button variant={'primary'}>Edit news</Button>
        </Link>
        <Button onClick={() => setIsOpenDeleteModal(true)} variant={'danger'}>
          Delete news
        </Button>
      </div>
      {isOpenDeleteModal && (
        <DeleteModal
          actionTitle={'Delete News'}
          cancelTitle={'Go Back News'}
          title={`Delete news: "${newsItem.title}" ?`}
          handleDelete={() => onDelete(newsItem.id)}
          onClose={() => setIsOpenDeleteModal(false)}
        />
      )}
    </li>
  )
}
