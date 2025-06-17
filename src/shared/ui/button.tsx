import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger' | 'created'
  children: ReactNode
}

export const Button = ({ variant = 'default', className, children, ...props }: ButtonProps) => {
  const base =
    'whitespace-nowrap px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    default:
      'bg-gray-400 text-black dark:bg-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700',
    primary: 'bg-blue-900 text-white hover:bg-blue-700',
    danger: 'bg-red-900 text-white hover:bg-red-700',
    created: 'bg-green-900 text-white hover:bg-green-700',
  }

  return (
    <button {...props} className={clsx(base, variants[variant], className)}>
      {children}
    </button>
  )
}
