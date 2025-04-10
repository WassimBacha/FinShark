import React, { JSX, SyntheticEvent } from 'react';
import Card from '../Card/Card';
import { CompanySearch } from '../../Company';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  SearchResult: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<Props> = ({
  SearchResult,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <>
      {SearchResult.length > 0 ? (
        SearchResult.map((result) => (
          <Card
            id={result.symbol}
            key={uuidv4()}
            SearchResult={result}
            onPortfolioCreate={onPortfolioCreate}
          />
        ))
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center text-gray-600 dark:text-gray-300 md:text-xl">
          No results!
        </p>
      )}
    </>
  );
};

export default CardList;
