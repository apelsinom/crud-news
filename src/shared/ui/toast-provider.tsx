import { ToastContainer } from 'react-toastify'
import { useTheme } from '@/shared/context/theme-context'

export const ToastProvider = () => {
  const { theme } = useTheme()

  return (
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable={true}
      theme={theme === 'dark' ? 'dark' : 'light'} // 🔁 авто подстройка
    />
  )
}
