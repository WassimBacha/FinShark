import React, { useEffect, useState } from 'react'
import { CompanyCashFlow } from '../../Company';
import { useOutletContext } from 'react-router-dom';
import { getCashFlow } from '../../api';
import RatioList from '../RatioList/RatioList';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';


interface Props  {}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(
        company.netCashUsedProvidedByFinancingActivities
      ),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssued),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
  ];
const CashFlowStatement = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [cashFlowStatement, setCashFlowStatement] = useState<CompanyCashFlow[]>();
    useEffect(() => {
        const CashFlowStatementFetch = async () => {
          const result = await getCashFlow(ticker!);
          setCashFlowStatement(result?.data);
        };
        CashFlowStatementFetch();
        
    }, [])
  return (
    <>
    {cashFlowStatement ? (
        <Table data = {cashFlowStatement} config = {config}/>
    ):(
        <Spinner/>
    )}
    </>
  )
}

export default CashFlowStatement