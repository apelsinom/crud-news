import { Link, useNavigate, useParams } from 'react-router-dom'
import { useNews } from '@/shared/hooks/use-news.ts'
import { ROUTES } from '@/shared/types/routes.ts'
import { Error404 } from '@/shared/ui/error-404.tsx'
import { type ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Button } from '@/shared/ui/button.tsx'
import TextareaAutosize from 'react-textarea-autosize'
import { DeleteModal } from '@/shared/ui/delete-modal.tsx'
import { convertToBase64 } from '@/shared/lib/convertToBase64.ts'
import { ErrorForInput } from '@/shared/ui/error-for-input.tsx'
import { useForm } from 'react-hook-form'
import { type FormData, schema } from '@/shared/types/zod-schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

export const EditNews = () => {
  const { newsId } = useParams<{ newsId: string }>()
  const navigate = useNavigate()

  const { newsList, updateNews, deleteNews, deleteImage } = useNews({
    onUpdate: () => toast.success('News successfully edited'),
    onDelete: () => toast.success('News successfully deleted'),
  })

  const newsItem = useMemo(() => {
    return newsList.find(news => news.id === newsId)
  }, [newsList, newsId])

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: newsItem?.title || '',
      content: newsItem?.content || '',
    },
  })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form

  const [isOpenDeleteNewsModal, setIsOpenDeleteNewsModal] = useState(false)
  const [isOpenDeleteImageModal, setIsOpenDeleteImageModal] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | undefined>(newsItem?.image ?? '')

  useEffect(() => {
    if (newsItem) {
      form.reset({
        title: newsItem.title,
        content: newsItem.content,
      })
      setImagePreview(newsItem.image)
    }
  }, [form, newsItem])

  if (!newsItem || !newsId) {
    return <Error404 />
  }

  const onSubmit = async (data: FormData) => {
    let base64Image = imagePreview
    if (image) {
      base64Image = await convertToBase64(image)
    }
    updateNews({
      ...newsItem,
      title: data.title,
      content: data.content,
      image: base64Image,
    })
    navigate(`/${newsId}`)
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
    deleteImage(newsId)
    setImage(null)
    setImagePreview('')
    setIsOpenDeleteImageModal(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <h1 className="text-xl md:text-2xl">News editing page</h1>
        <TextareaAutosize
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
          {...register('title')}
        />
        <ErrorForInput
          errorMessage={errors.title?.message}
          inputName={watch('title') || ''}
          maxLengthStr={'100'}
        />
        <div className="flex items-start justify-start gap-5">
          <div className="flex flex-col gap-5">
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-block px-4 py-2 border rounded bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {imagePreview ? 'Change image' : 'Choose image'}
            </label>
            {imagePreview && (
              <Button
                type="button"
                onClick={() => setIsOpenDeleteImageModal(true)}
                variant={'outline'}
              >
                Remove image
              </Button>
            )}
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
              className="max-w-[50%] md:max-w-[25%] object-contain rounded-lg"
            />
          )}
        </div>
        <TextareaAutosize
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
          {...register('content')}
        />
        <ErrorForInput
          errorMessage={errors.content?.message}
          inputName={watch('content') || ''}
          maxLengthStr={'1000'}
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
          onClose={() => setIsOpenDeleteNewsModal(false)}
        />
      )}
      {isOpenDeleteImageModal && (
        <DeleteModal
          actionTitle={'Delete Image'}
          cancelTitle={'Return to Edit'}
          title={'Are you sure you want to delete this Image?'}
          handleDelete={handleRemoveImage}
          onClose={() => setIsOpenDeleteImageModal(false)}
        />
      )}
    </>
  )
}
