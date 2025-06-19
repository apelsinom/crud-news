import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/shared/ui/button.tsx'
import TextareaAutosize from 'react-textarea-autosize'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'
import { ROUTES } from '@/shared/types/routes.ts'
import { convertToBase64 } from '@/shared/hooks/convertToBase64.ts'

export const AddNews = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { addNews } = useLocalStorageNews()
  const navigate = useNavigate()

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    let base64Image: string | undefined
    if (image) {
      base64Image = await convertToBase64(image)
    }

    const newNews = {
      id: Date.now().toString(),
      title,
      content,
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
      <form onSubmit={e => void handleSave(e)} className="flex flex-col gap-5">
        <TextareaAutosize
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter news title"
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
        />
        <span className="text-sm text-right mt-[-16px]">{title.length}/100</span>
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
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Enter news content"
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
        />
        <span className="text-sm text-right mt-[-16px]">{title.length}/1000</span>
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
