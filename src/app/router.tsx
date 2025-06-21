import { ROUTES } from '@/shared/types/routes.ts'
import App from '@/app/app.tsx'
import { createBrowserRouter } from 'react-router-dom'
import { NewsList } from '@/features/news-list/news-list.tsx'
import { Error404 } from '@/shared/ui/error-404.tsx'
import { EditNews } from '@/features/edit-news/edit-news.tsx'
import { AddNews } from '@/features/add-news/add-news.tsx'
import { NewsPage } from '@/features/news-page/news-page.tsx'

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        element: <NewsList />,
        path: ROUTES.HOME,
      },
      {
        element: <NewsPage />,
        path: `${ROUTES.NEWS}/:newsId`,
      },
      {
        element: <EditNews />,
        path: `${ROUTES.EDIT}/:newsId`,
      },
      {
        element: <AddNews />,
        path: ROUTES.ADD,
      },
    ],
  },
])
