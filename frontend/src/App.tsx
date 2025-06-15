import { BrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { ThemeProvider } from "./ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Context/useAuth";
import Footer from "./Components/Footer/Footer";

function App() {
 

  return (
   
    <div className="bg-white dark:bg-gray-900">
    <UserProvider>
    <ThemeProvider>
    <Navbar />
    <Outlet />
    <Footer />
    <ToastContainer />
    </ThemeProvider>
    </UserProvider>
    </div>
    
  );
}

export default App;