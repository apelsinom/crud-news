import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'
import { ROUTES } from '@/shared/types/routes.ts'
import { Error404 } from '@/shared/ui/error-404.tsx'
import { type FormEvent, useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button.tsx'
import TextareaAutosize from 'react-textarea-autosize'
import { DeleteModal } from '@/shared/ui/delete-modal.tsx'

export const EditNews = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const { newsId } = useParams<{ newsId: string }>()
  const { newsList, updateNews, deleteNews } = useLocalStorageNews()
  const navigate = useNavigate()

  const newsItem = newsList.find(news => news.id === newsId)

  const [title, setTitle] = useState(newsItem?.title ?? '')
  const [content, setContent] = useState(newsItem?.content ?? '')

  useEffect(() => {
    if (newsItem) {
      setTitle(newsItem.title)
      setContent(newsItem.content)
    }
  }, [newsItem])

  if (!newsItem || !newsId) {
    return <Error404 />
  }

  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    updateNews({
      ...newsItem,
      title,
      content,
    })
    navigate(`${ROUTES.NEWS}/${newsId}`)
  }

  const handleDelete = () => {
    deleteNews(newsId)
    setIsOpenDeleteModal(false)
    navigate(ROUTES.HOME)
  }

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={handleSave}>
        <h1 className="text-xl md:text-2xl">Edit News</h1>
        <TextareaAutosize
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
        />
        <TextareaAutosize
          value={content}
          onChange={e => setContent(e.target.value)}
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
        />
        <div className="flex gap-1 justify-between sm:justify-start sm:gap-10">
          <Link to={ROUTES.HOME}>
            <Button>Go Back News</Button>
          </Link>
          <Button type="submit" variant={'primary'}>
            Save
          </Button>
          <Button type="button" onClick={() => setIsOpenDeleteModal(true)} variant={'danger'}>
            Delete news
          </Button>
        </div>
      </form>
      {isOpenDeleteModal && (
        <DeleteModal
          actionTitle={'Delete News'}
          cancelTitle={'Return to Edit'}
          title={'Are you sure you want to delete this news item?'}
          handleDelete={handleDelete}
          onOpenChange={() => setIsOpenDeleteModal(false)}
        />
      )}
    </div>
  )
}
