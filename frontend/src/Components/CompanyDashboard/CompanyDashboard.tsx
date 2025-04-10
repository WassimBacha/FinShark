import React from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  ticker: string;
}

const CompanyDashboard: React.FC<Props> = ({ children, ticker }: Props) => {
  return (
    <div className="relative md:ml-64 bg-blueGray-100 dark:bg-gray-900 w-full">
      <div className="relative pt-20 pb-32 bg-lightBlue-500 dark:bg-blueGray-800">
        <div className="px-4 md:px-6 mx-auto w-full">
          <div>
            {/* Render children with grid */}
            <div className="flex flex-wrap">{children}</div>

            {/* Render outlet with ticker */}
            <div className="flex flex-wrap">
              <Outlet context={ticker} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
