import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CompanySearch } from '../../Company';
import { SearchCompanies } from '../../api';
import Navbar from '../../Components/Navbar/Navbar';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import Search from '../../Components/Search/Search';

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
  
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
  
    const onPortfolioCreate = (e: any) => {
      e.preventDefault();
      //DO NOT DO THIS
      // portfolioValues.push(event.target[0].value)
      // setPortfolioValues(portfolioValues);
      const exists = portfolioValues.find((value) => value === e.target[0].value);
      if (exists) return;
      const updatedPortfolio = [...portfolioValues, e.target[0].value];
      setPortfolioValues(updatedPortfolio);
    };
  
    const onPortfolioDelete = (e: any) => {
      e.preventDefault();
      const removed = portfolioValues.filter((value) => {
        return value !== e.target[0].value;
      });
      setPortfolioValues(removed);
    };
  
    const onSearchSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      const result = await SearchCompanies(search);
      //setServerError(result.data);
      if (typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result.data)) {
        setSearchResult(result.data);
      }
    };
  return <>
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
  
  <Search 
    onSearchSubmit={onSearchSubmit}
    search={search}
    handleSearchChange={handleSearchChange}
  />
  <ListPortfolio
    portfolioValues={portfolioValues}
    onPortfolioDelete={onPortfolioDelete}
  />
  <CardList
    SearchResult={searchResult}
    onPortfolioCreate={onPortfolioCreate}
  />

  {serverError && <div>Unable to connect to API</div>}
  </div>
</>
  
  
}

export default SearchPage