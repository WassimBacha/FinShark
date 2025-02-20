import axios from "axios";
import { CompanySearch } from "./Company"




interface SearchResponse {
    data : CompanySearch[]
}
export const SearchCompanies = async (query: string) => {
    try{
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
        )
        return data
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log('errormessage', error.message)
           return error.message

    }else{
        console.log("unexpected error", error)
        return "an unexpected error"
    }
}
}