import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { CompanyKeyMetrics } from '../../Company'
import { testIncomeStatementData } from '../../Components/Table/TestData'

interface Props  {}
const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
]

const DesignPage = (props: Props) => {
  return (
    <>
    <h1>Finshar design page</h1>
    <h2>this is finshark design page we will house various designs for our app </h2>
    <RatioList data = {testIncomeStatementData} config = {tableConfig}/>
    <Table config={tableConfig} data={testIncomeStatementData} />
    </>
  )
}

export default DesignPage