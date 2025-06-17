import { ThemeSwitcher } from '@/features/theme-swithcher.tsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <div className="max-w-screen-xl min-h-screen mx-auto p-5 flex flex-col items-start">
        <div className="self-end">
          <ThemeSwitcher />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
