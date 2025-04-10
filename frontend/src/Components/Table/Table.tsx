import React from 'react';
import { testIncomeStatementData } from './TestData';

const data = testIncomeStatementData;

interface Props {
  data: any;
  config: any;
}

type Company = typeof data[0];

const Table = ({ data, config }: Props) => {
  const RenderedRows = data.map((company: any, index: number) => {
    return (
      <tr 
        key={company.cik} 
        className={`${
          index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
        } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
      >
        {config.map((val: any, colIndex: number) => {
          return (
            <td 
              key={`${company.cik}-${colIndex}`}
              className="px-4 py-3 whitespace-nowrap text-sm font-normal text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
            >
              {val.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

  const RenderHeaders = config.map((config: any) => {
    return (
      <th 
        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600" 
        key={config.label}
      >
        {config.label}
      </th>
    );
  });

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>{RenderHeaders}</thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{RenderedRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;