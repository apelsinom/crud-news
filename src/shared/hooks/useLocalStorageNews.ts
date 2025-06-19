import { useEffect, useState } from 'react'
import { news as defaultNews } from '@/shared/data/news.ts'
import type { NewsType } from '@/shared/types/news-type.ts'
import { toast } from 'react-toastify'

const LOCAL_STORAGE_KEY = 'news-list'

export const useLocalStorageNews = () => {
  const [newsList, setNewsList] = useState<NewsType[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      setNewsList(JSON.parse(stored) as NewsType[])
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultNews))
      setNewsList(defaultNews)
    }
  }, [])

  const save = (list: NewsType[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
    setNewsList(list)
  }

  const addNews = (item: NewsType) => {
    save([item, ...newsList])
    toast.success('News successfully added')
  }

  const updateNews = (item: NewsType) => {
    const updated = newsList.map(n => (n.id === item.id ? item : n))
    save(updated)
    toast.success('News successfully edited')
  }

  const deleteNews = (id: string) => {
    const filtered = newsList.filter(n => n.id !== id)
    save(filtered)
    toast.success('News successfully deleted')
  }

  return {
    newsList,
    setNewsList,
    addNews,
    updateNews,
    deleteNews,
  }
}
