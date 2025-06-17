import { ROUTES } from '@/shared/types/routes.ts'
import App from '@/app/app.tsx'
import { createBrowserRouter } from 'react-router-dom'
import { NewsList } from '@/features/news-list.tsx'
import { Error404 } from '@/features/Error404.tsx'
import { EditNews } from '@/features/edit-news.tsx'
import { AddNews } from '@/features/add-news.tsx'
import { NewsPage } from '@/features/news-page.tsx'

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
