import React from 'react';
import { TestDataCompany } from '../Table/TestData';

type Props = {
  config: any;
  data: any;
};

const data = TestDataCompany[0];

const RatioList = ({ config, data }: Props) => {
  const renderedCells = config.map((row: any) => {
    return (
      <li className="py-6 sm:py-6 dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-300 truncate">
              {row.label}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              <p>{row.subTitle && row.subTitle}</p>
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {row.render(data)}
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 w-full">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">{renderedCells}</ul>
    </div>
  );
};

export default RatioList;
