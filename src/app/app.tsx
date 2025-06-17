import { ThemeSwitcher } from '@/features/theme-swithcher.tsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <div className="max-w-screen-xl min-h-screen mx-auto p-5 flex flex-col items-start">
        <div className="flex w-full items-center justify-between mb-1">
          <div className="flex gap-1 items-center">
            <img className="max-h-10" src={'./../world-news.svg'} alt={'News'} />
            <h1 className="text-[#023ef2] font-bold text-xl md:text-2xl">BubblyNews </h1>
          </div>
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
