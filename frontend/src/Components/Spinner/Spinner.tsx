import React from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
    isLoading?: boolean
}

const Spinner = ({isLoading = true}: Props) => {
  return (
    <div className="flex items-center justify-center p-4 my-4 bg-white dark:bg-gray-800 rounded-md">
      <div className="flex flex-col items-center">
        <ClipLoader
          color="currentColor"
          loading={isLoading}
          size={35}
          aria-label="loading-spinner"
          data-testid="loader"
          className="text-blue-500 dark:text-blue-400"
        />
        <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {isLoading ? 'Loading...' : ''}
        </span>
      </div>
    </div>
  )
}

export default Spinner