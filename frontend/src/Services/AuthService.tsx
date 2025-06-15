import axios from "axios";
import { handlEerror } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:7051/backend/";
export const LoginAPI = async (userName : string, password : string) => {
    try{
        const data = await axios.post<UserProfileToken>(api + "account/login", {
            username : userName,
            password : password
            
        })
        return data 

    }catch(error)
    {
        handlEerror(error);

    }
}

export const RegisterAPI = async (email : string , username : string, password : string) => {
    try{
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            username : username,
            password : password,
            email : email
            
        })
        return data 

    }catch(error)
    {
        handlEerror(error);

    }
}