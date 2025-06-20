import { type ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/button.tsx'
import TextareaAutosize from 'react-textarea-autosize'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'
import { ROUTES } from '@/shared/types/routes.ts'
import { convertToBase64 } from '@/shared/hooks/convertToBase64.ts'
import { useForm } from 'react-hook-form'
import { type FormData, schema } from '@/shared/types/zod-schema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorForInput } from '@/shared/ui/error-for-input.tsx'

export const AddNews = () => {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { addNews } = useLocalStorageNews()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const title = watch('title') || ''
  const content = watch('content') || ''

  const onSubmit = async (data: FormData) => {
    let base64Image: string | undefined
    if (image) {
      base64Image = await convertToBase64(image)
    }

    const newNews = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      date: new Date().toLocaleDateString('ru-BY'),
      image: base64Image,
    }

    addNews(newNews)
    navigate(ROUTES.HOME)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl md:text-2xl">News adding page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <TextareaAutosize
          placeholder="Enter news title"
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
          {...register('title')}
        />
        <ErrorForInput
          errorMessage={errors.title?.message}
          inputName={title}
          maxLengthStr={'100'}
        />
        <div className="flex items-start justify-start gap-5">
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block px-4 py-2 border rounded bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {image ? 'Change image' : 'Choose image'}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="max-w-xs h-auto rounded-lg" />
          )}
        </div>
        <TextareaAutosize
          placeholder="Enter news content"
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
          {...register('content')}
        />
        <ErrorForInput
          errorMessage={errors.content?.message}
          inputName={content}
          maxLengthStr={'1000'}
        />
        <div className="flex gap-10">
          <Link to={ROUTES.HOME}>
            <Button>Go Back Home</Button>
          </Link>
          <Button type="submit" variant={'primary'}>
            Save News
          </Button>
        </div>
      </form>
    </div>
  )
}
