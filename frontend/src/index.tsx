import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SearchCompanies } from './api';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { ThemeProvider } from './ThemeContext';

console.log("Testing if this runs at all");  // Add this
console.log('Router:', router);  // And this


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log(SearchCompanies("tsla"));
root.render(
  <ThemeProvider>
  <React.StrictMode>
   
      <RouterProvider router={router} />
    
  </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
