import { useCallback, useState } from 'react'
import { defaultNews } from '@/shared/hooks/default-news.ts'
import type { NewsType } from '@/shared/types/news-type.ts'

const LOCAL_STORAGE_KEY = 'news-list'

type Props = {
  onAdd?: () => void
  onUpdate?: () => void
  onDelete?: () => void
}

const getInitialNewsList = (): NewsType[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (stored) return JSON.parse(stored) as NewsType[]
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultNews))
  return defaultNews
}

export const useNews = ({ onAdd, onDelete, onUpdate }: Props = {}) => {
  const [newsList, setNewsList] = useState<NewsType[]>(getInitialNewsList)

  const save = useCallback((list: NewsType[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
    setNewsList(list)
  }, [])

  const addNews = useCallback(
    (item: NewsType) => {
      save([item, ...newsList])
      onAdd?.()
    },
    [newsList, save, onAdd]
  )

  const updateNews = useCallback(
    (item: NewsType) => {
      save(newsList.map(n => (n.id === item.id ? item : n)))
      onUpdate?.()
    },
    [newsList, save, onUpdate]
  )

  const deleteNews = useCallback(
    (id: string) => {
      save(newsList.filter(n => n.id !== id))
      onDelete?.()
    },
    [newsList, save, onDelete]
  )

  const deleteImage = useCallback(
    (id: string) => {
      save(newsList.map(n => (n.id === id ? { ...n, image: undefined } : n)))
      onDelete?.()
    },
    [newsList, save, onDelete]
  )

  return {
    newsList,
    setNewsList,
    addNews,
    updateNews,
    deleteNews,
    deleteImage,
  }
}
