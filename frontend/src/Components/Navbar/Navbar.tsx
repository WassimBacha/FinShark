import React from 'react';
import { Link } from 'react-router-dom';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

const logo = "/logo.png";

interface Props {}

const Navbar = (props: Props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="relative container mx-auto p-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="flex items-center justify-between dark:bg-gray-900 transition-colors duration-200">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="FinShark logo" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black dark:text-white hover:text-darkBlue dark:hover:text-blue-400">
              Search
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-black dark:text-white">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus:outline-none"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-800" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </button>
          <div className="hover:text-darkBlue dark:hover:text-blue-400">Login</div>
          <a
            href=""
            className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
          >
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;