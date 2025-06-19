import { type FormEvent, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/shared/ui/button.tsx'
import TextareaAutosize from 'react-textarea-autosize'
import { useLocalStorageNews } from '@/shared/hooks/useLocalStorageNews.ts'
import { ROUTES } from '@/shared/types/routes.ts'

export const AddNews = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { addNews } = useLocalStorageNews()
  const navigate = useNavigate()

  const handleSave = (e: FormEvent) => {
    e.preventDefault()

    const newNews = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toLocaleDateString('ru-BY'),
    }

    addNews(newNews)
    navigate(ROUTES.HOME)
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl md:text-2xl">Add News</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <TextareaAutosize
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter news title"
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
        />
        <TextareaAutosize
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Enter news content"
          className="p-2 border border-gray-300 rounded dark:bg-dark-bg"
        />
        <div className="flex gap-10">
          <Link to={ROUTES.HOME}>
            <Button>Go Back Home</Button>
          </Link>
          <Button type="submit" variant={'primary'}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
