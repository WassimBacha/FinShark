import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { json } from "stream/consumers";
import { LoginAPI, RegisterAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type useContextType={
    user : UserProfile | null,
    token : string | null,
    registerUser:(email : string,username : string , password : string) => void,
    loginUser:(username : string, password : string) => void,
    logout:() => void
    isLoggedIn:()  => boolean
}
type Props = {children:React.ReactNode};
const UserContext = createContext<useContextType>({} as useContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token,SetToken] = useState<string | null>(null);
    const [user,SetUser]= useState<UserProfile| null>(null);
    const [isready,SetIsReasy]=useState(false);
    useEffect(()=>{
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if(user && token){
            SetUser(JSON.parse(user))
            SetToken(token)
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        SetIsReasy(true)
    },[])
    const registerUser = async (email: string, username: string, password: string) => {
        await RegisterAPI(email, username, password)
          .then((res) => {
            if (res) {
              localStorage.setItem("token", res?.data.token);
              const userObj = {
                userName: res?.data.userName,
                email: res?.data.email,
                
              };
              localStorage.setItem("user", JSON.stringify(userObj));
              SetToken(res?.data.token!);
              SetUser(userObj!);
              toast.success("Login Successful");
              navigate("/search");
              
            }
            
          })
          .catch((e) => toast.warning("Server Error"));
    };

    const loginUser = async (username: string, password: string) => {
        await LoginAPI(username, password)
          .then((res) => {
            if (res) {
              localStorage.setItem("token", res?.data.token);
              const userObj = {
                email: res?.data.email,
                userName: res?.data.userName,
                
              };
              localStorage.setItem("user", JSON.stringify(userObj));
              SetToken(res?.data.token!);
              SetUser(userObj!);
              toast.success("Login Success!");
              navigate("/search");
              
            }
          })
          .catch((e) => toast.warning("Server error occured"));
      };
    

    const isLoggedIn = ()=>{
        return !!user
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        SetUser(null);
        SetToken("");
        navigate("/");
      };
    return (
        <UserContext.Provider value={{loginUser,user,token,logout,isLoggedIn,registerUser,}}>
             {isready ? children : null}
              
              
       </UserContext.Provider>
    )
};
export const useAuth = () => React.useContext(UserContext);
