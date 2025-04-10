import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio'
import { Link } from 'react-router-dom';

interface Props {
    portfolioValues: string
    onPortfolioDelete: (e: SyntheticEvent) => void
}

const CardPortfolio = ({portfolioValues, onPortfolioDelete}: Props) => {
  return (
    <div className="flex flex-col w-full p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
          <span className="text-blue-600 dark:text-blue-300 font-bold">
            {portfolioValues.charAt(0)}
          </span>
        </div>
        <DeletePortfolio
          PortfolioValues={portfolioValues}
          onPortfolioDelete={onPortfolioDelete}
        />
      </div>
      
      <Link 
        to={`/company/${portfolioValues}/company-profile`} 
        className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline text-center py-3"
      >
        {portfolioValues}
      </Link>
      
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            In Portfolio
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardPortfolio;