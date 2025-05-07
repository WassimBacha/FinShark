import { BrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { ThemeProvider } from "./ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
 

  return (
   
    <div className="bg-white dark:bg-gray-900">
    <ThemeProvider>
    <Navbar />
    <Outlet />
    <ToastContainer />
    </ThemeProvider>
    </div>
    
  );
}

export default App;