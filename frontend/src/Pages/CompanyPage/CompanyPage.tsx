import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { CompanyProfile } from '../../Company'
import { getCompanyProfile } from '../../api'
import Sidebar from '../../Components/Sidebar/Sidebar'
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard'
import Tile from '../../Components/Tile/Tile'

interface Props  {}
 


const CompanyPage = (props: Props) => {
  <Navbar />
  let {ticker} = useParams();
  const [company, setCompany] = useState<CompanyProfile>()
  useEffect(() => {
    const getProfileInit = async () => {
      const result =await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    }
    getProfileInit()
  },[])
  return <>
  {company ? (
    <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">

    <Sidebar />

   <CompanyDashboard ticker={ticker!}>
    <Tile Title = "Company Name" SubTitle={company.companyName}></Tile>
    <Tile Title="Price" SubTitle={"$" + company.price.toString()} />
    <Tile Title = "Sector" SubTitle={company.sector}></Tile>
    <Tile Title = "DCF" SubTitle={"$" + company.dcf.toString()}></Tile>
    <p className="bg-white dark:bg-gray-800 shadow rounded text-medium text-gray-900 dark:text-white p-3 mt-5 m-4">
              {company.description}
            </p>
   </CompanyDashboard>

  </div>
  ):(
    <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
      No results!
    </p>
  )}  
  
  </>
  
}

export default CompanyPage