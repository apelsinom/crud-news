import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router.tsx'
import { ThemeProvider } from '@/shared/context/theme-context.tsx'
import { ToastProvider } from '@/shared/ui/toast-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
