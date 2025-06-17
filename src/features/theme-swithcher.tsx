import { useTheme } from '@/shared/context/theme-context.tsx'
import { Button } from '@/shared/ui/button.tsx'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} variant="default">
      {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </Button>
  )
}
