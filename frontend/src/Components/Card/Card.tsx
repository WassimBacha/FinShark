import React, { JSX, SyntheticEvent } from 'react';
import './Card.css';
import { CompanySearch } from '../../Company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  SearchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({
  id,
  SearchResult,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between w-full max-w-full overflow-hidden p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mx-0 my-2 border border-gray-200 dark:border-gray-700"
      key={id}
      id={id}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3 mb-3 md:mb-0 w-full md:w-auto">
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
          <span className="text-blue-600 dark:text-blue-300 font-bold text-sm">
            {SearchResult.symbol.charAt(0)}
          </span>
        </div>
        
        <div className="text-center md:text-left w-full md:w-auto truncate">
          <Link
            to={`/company/${SearchResult.symbol}/company-profile`}
            className="font-bold text-base text-blue-600 dark:text-blue-400 hover:underline truncate block"
          >
            <span className="truncate">{SearchResult.name}</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">
              ({SearchResult.symbol})
            </span>
          </Link>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
            {SearchResult.currency} • {SearchResult.exchangeShortName}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center md:items-center space-y-2 md:space-y-0 md:space-x-3 flex-shrink-0">
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
          {SearchResult.stockExchange}
        </span>
        
        <AddPortfolio
          onPortfolioCreate={onPortfolioCreate}
          symbol={SearchResult.symbol}
        />
      </div>
    </div>
  );
};

export default Card;