import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger'
  children: ReactNode
}

export const Button = ({ variant = 'default', className, children, ...props }: ButtonProps) => {
  const base = 'px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    default:
      'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800',
    primary: 'bg-blue-500 text-white hover:bg-blue-700',
    danger: 'bg-red-500 text-white hover:bg-red-700',
  }

  return (
    <button {...props} className={clsx(base, variants[variant], className)}>
      {children}
    </button>
  )
}
