import React, { SyntheticEvent } from 'react';
import CardPortfolio from '../CardPortfolio/CardPortfolio';

interface Props {
  portfolioValues: string[];
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <section id="portfolio" className="bg-white dark:bg-gray-900 py-8 px-4 md:py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span className="relative inline-block">
            <span className="relative z-10">My Portfolio</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-100 dark:bg-blue-900 opacity-50 rounded"></span>
          </span>
        </h2>
        
        {portfolioValues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {portfolioValues.map((portfolioValue) => (
              <CardPortfolio
                key={portfolioValue}
                portfolioValues={portfolioValue}
                onPortfolioDelete={onPortfolioDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center mt-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300 md:text-2xl">
              Your portfolio is empty.
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Add stocks or assets to track your investments.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListPortfolio;