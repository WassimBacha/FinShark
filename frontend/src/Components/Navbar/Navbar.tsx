/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { useAuth } from '../../Context/useAuth';

const logo = "/FinsharkLogo.png";

interface Props {}

const Navbar = (props: Props) => {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();
  
 console.log(user?.userName);

  return (
    <nav className="relative container mx-auto p-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="flex items-center justify-between dark:bg-gray-900 transition-colors duration-200">

        {/* Left: Logo + Search */}
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="FinShark logo" className="w-24 h-auto" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black dark:text-white hover:text-darkBlue dark:hover:text-blue-400">
              Search
            </Link>
            
          </div>
        </div>

        {/* Right: Dark Mode Toggle + Auth Controls */}
        <div className="flex items-center space-x-6 text-black dark:text-white">

          {/* Dark mode toggle (always visible) */}
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

          {/* Authenticated user */}
          {isLoggedIn() ? (
            <>
              <span className="hidden font-bold lg:flex">
              <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
              
            
              </span>
              <button
                onClick={logout}
                className="hidden lg:flex px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="hidden font-bold lg:flex">
                <Link to="/login" className="text-black dark:text-white hover:text-darkBlue dark:hover:text-blue-400">
                  Login
                </Link>
              </div>
              <div className="hidden font-bold lg:flex">
                <Link to="/register" className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">
                  Signup
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
