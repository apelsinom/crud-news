import { Link } from 'react-router-dom'

export const Error404 = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-bold m-0">404</h1>
      <p className="text-xl my-4">Page Not Found</p>
      <Link
        to="/"
        className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  )
}
