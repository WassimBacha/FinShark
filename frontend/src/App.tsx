import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';
import { CompanySearch } from './Company';
import { SearchCompanies } from './api';
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';


function App() {

  const [search,SetSearch] = useState<string>("");
  const[SearchResult,SetSearchResult] = useState<CompanySearch[]>([]);  
  const[ServerError,SetServErerror] = useState<string | null>(null);
  const[PortfolioValues,SetPortfolioValues] = useState<string[]>([]);
      const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
          SetSearch(e.target.value);
          console.log(e);
      };
      const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
          const result = await SearchCompanies(search);
          if (typeof result === "string"){
            SetServErerror(result);
          }else if (Array.isArray(result.data)){
            SetSearchResult(result.data);
          }
          console.log(SearchResult);
      };

      const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        const exists = PortfolioValues.find((value)=>value===e.target[0].value);
        if(exists){
          return;
        }
        const updatedPortfolio = [...PortfolioValues, e.target[0].value];
        SetPortfolioValues(updatedPortfolio);
      }
      const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        const removed = PortfolioValues.filter((value)=>{ return value!==e.target[0].value});
        SetPortfolioValues(removed);
      }

  return (
   
    <div className="App">
       <Navbar />
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
      <ListPortfolio portfolioValues={PortfolioValues} onPortfolioDelete={onPortfolioDelete}/>
      {ServerError && <h1>{ServerError}</h1>}
      <CardList SearchResult={SearchResult} onPortfolioCreate={onPortfolioCreate}/>
    </div>
  );
}

export default App;
