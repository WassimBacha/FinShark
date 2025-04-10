import { createBrowserRouter} from "react-router-dom";
import App from "../App";

import SearchPage from "../Pages/SearchPage/SearchPage";
import HomePage1 from "../Pages/HomePage1/HomePage1";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";


console.log("Router file is being executed");  
console.log("Imported components:", { App, HomePage1, SearchPage, CompanyPage });

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage1 />},
            {path: "search", element: <SearchPage />},
            {path: "design-guide", element: <DesignPage />},
            {path: "company/:ticker", element: <CompanyPage />,
                children: [
                    {path: "company-profile", element: <CompanyProfile />},
                    {path: "income-statement", element: <IncomeStatement />},
                    {path: "balance-sheet", element: <BalanceSheet />},
                    {path: "cash-flow", element: <CashFlowStatement />},
                ]
            },
            
        ]
    },
]);
