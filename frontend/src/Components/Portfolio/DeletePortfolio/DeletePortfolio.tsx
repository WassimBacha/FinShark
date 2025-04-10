import React, { SyntheticEvent } from 'react'

interface Props {
    onPortfolioDelete: (e: SyntheticEvent) => void
    PortfolioValues: string
}

const DeletePortfolio = ({onPortfolioDelete, PortfolioValues}: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input type="hidden" value={PortfolioValues} />
        <button 
          type="submit"
          className="flex items-center justify-center w-8 h-8 rounded-full text-white bg-red-500 hover:bg-red-600 focus:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:bg-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label={`Remove ${PortfolioValues} from portfolio`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default DeletePortfolio