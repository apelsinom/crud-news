import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'
import { ROUTES } from '@/shared/types/routes.ts'
import { Error404 } from '@/shared/ui/error-404.tsx'
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button.tsx'
import TextareaAutosize from 'react-textarea-autosize'
import { DeleteModal } from '@/shared/ui/delete-modal.tsx'
import { convertToBase64 } from '@/shared/hooks/convertToBase64.ts'

export const EditNews = () => {
  const [isOpenDeleteNewsModal, setIsOpenDeleteNewsModal] = useState(false)
  const [isOpenDeleteImageModal, setIsOpenDeleteImageModal] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const { newsId } = useParams<{ newsId: string }>()
  const { newsList, updateNews, deleteNews } = useLocalStorageNews()
  const navigate = useNavigate()

  const newsItem = newsList.find(news => news.id === newsId)

  const [title, setTitle] = useState(newsItem?.title ?? '')
  const [content, setContent] = useState(newsItem?.content ?? '')
  const [imagePreview, setImagePreview] = useState<string | undefined>(newsItem?.image ?? '')

  useEffect(() => {
    if (newsItem) {
      setTitle(newsItem.title)
      setContent(newsItem.content)
      setImagePreview(newsItem.image)
    }
  }, [newsItem])

  if (!newsItem || !newsId) {
    return <Error404 />
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()

    let base64Image = imagePreview
    if (image) {
      base64Image = await convertToBase64(image)
    }
    updateNews({
      ...newsItem,
      title,
      content,
      image: base64Image,
    })
    navigate(`${ROUTES.NEWS}/${newsId}`)
  }

  const handleRemoveNews = () => {
    deleteNews(newsId)
    setIsOpenDeleteNewsModal(false)
    navigate(ROUTES.HOME)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview('')
  }

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={e => void handleSave(e)}>
        <h1 className="text-xl md:text-2xl">Edit News</h1>
        <TextareaAutosize
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
        />
        <div className="flex items-start justify-start gap-5">
          <div className="flex flex-col gap-5">
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-block px-4 py-2 border rounded bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {imagePreview ? 'Change image' : 'Choose image'}
            </label>
            <Button
              type="button"
              onClick={() => setIsOpenDeleteImageModal(true)}
              variant={'outline'}
            >
              Remove image
            </Button>
          </div>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-[60%] md:max-w-[25%] object-contain rounded-lg"
            />
          )}
        </div>
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
            Save News
          </Button>
          <Button type="button" onClick={() => setIsOpenDeleteNewsModal(true)} variant={'danger'}>
            Delete news
          </Button>
        </div>
      </form>
      {isOpenDeleteNewsModal && (
        <DeleteModal
          actionTitle={'Delete News'}
          cancelTitle={'Return to Edit'}
          title={'Are you sure you want to delete this news item?'}
          handleDelete={handleRemoveNews}
          onOpenChange={() => setIsOpenDeleteNewsModal(false)}
        />
      )}
      {isOpenDeleteImageModal && (
        <DeleteModal
          actionTitle={'Delete Image'}
          cancelTitle={'Return to Edit'}
          title={'Are you sure you want to delete this Image?'}
          handleDelete={handleRemoveImage}
          onOpenChange={() => setIsOpenDeleteImageModal(false)}
        />
      )}
    </div>
  )
}
