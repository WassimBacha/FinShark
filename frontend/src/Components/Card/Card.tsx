import React, { JSX, SyntheticEvent } from 'react'
import "./Card.css";
import { CompanySearch } from '../../Company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';
interface Props {
 id : string
 SearchResult : CompanySearch
 onPortfolioCreate : (e: SyntheticEvent) => void
}


const Card: React.FC<Props> = ({id, SearchResult,onPortfolioCreate}: Props): JSX.Element => {
   return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
      id={id}
    >
      <h2 className="font-bold text-center text-black md:text-left">
        {SearchResult.name} ({SearchResult.symbol})
      </h2>
      <p className="text-black">{SearchResult.currency}</p>
      <p className="font-bold text-black">
        {SearchResult.exchangeShortName} - {SearchResult.stockExchange}
      </p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={SearchResult.symbol}
      />
    </div>
  );
};

export default Card




