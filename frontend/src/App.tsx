import { BrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { ThemeProvider } from "./ThemeContext";

function App() {
 

  return (
   
    <div className="bg-white dark:bg-gray-900">
    <ThemeProvider>
    <Navbar />
    <Outlet />
    </ThemeProvider>
    </div>
    
  );
}

export default App;