import React from 'react';

interface Props {
    Title: string;
    SubTitle: string;
}

const Tile = ({ Title, SubTitle }: Props) => {
  return (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 rounded-lg mb-6 xl:mb-0 shadow-lg dark:shadow-gray-700">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 dark:text-gray-300 uppercase font-bold text-xs">
                {Title}
              </h5>
              <span className="font-bold text-xl text-blueGray-700 dark:text-white">
                {SubTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tile;
