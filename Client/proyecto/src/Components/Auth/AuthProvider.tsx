import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import type { AccessTokenResponse, AuthResponse, User} from "../types/types";


const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () =>{},
    saveUser: (userData: AuthResponse) => {},
    getRefreshToken : () =>{}
  
});

interface AuthProviderProps {
    children: React.ReactNode;
  }
export function AuthProvider({children}: AuthProviderProps){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();
    //const [refreshToken, setRefreshToken] = useState<string>("");
    useEffect(() =>{},[])

    async function checkAuth(){
        if(accessToken){
            //el usuario esta autenticado
        }else{
            //el usuario no esta autenticado
            const token = getRefreshToken();
            if(token){
                const newAccessToken = await requestNewAccessToken(token);
                if(newAccessToken){
                    const userInfo = await getUserInfo(newAccessToken);
                    if(userInfo){
                        saveSesionInfo(userInfo,newAccessToken, token);
                    }
                }
            }
        }
    }

    function saveSesionInfo(userInfo: User, accessToken: string, refreshToken: string){
        setAccessToken(accessToken);
        setUser(userInfo);
        localStorage.setItem("Token", JSON.stringify(refreshToken));
        setIsAuthenticated(true);

    }

    async function getUserInfo(accessToken: string) {
        try{
            const response = await fetch("http://localhost:4000/api/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer  ${accesToken}',
                },
            });
            if (response.ok){
                const json = await response.json();
                if (json.error){
                    throw new Error(json.error);
                }
                return json;
            }else{
                throw new Error(response.statusText);
            }
        }catch(error){
            console.log(error);
            return null;
        }
        
    }

   async function requestNewAccessToken(refreshToken:string){
        try{
            const response = await fetch("http://localhost:4000/api/refresh-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: 'Bearer  ${refreshToken}',
                },
            });
            if (response.ok){
                const json = await response.json() as AccessTokenResponse;
                if (json.error){
                    throw new Error(json.error);
                }
                return json.body.accessToken;
            }else{
                throw new Error(response.statusText);
            }
        }catch(error){
            console.log(error);
            return null;
        }
    }

    function getAccessToken() {
        return accessToken;
    }
    function getRefreshToken():string|null {
        const token = localStorage.getItem("token");
        if (token){
            const {refreshToken} = JSON.parse(token);
            return  refreshToken;
        }
            return null;
        
    }

    function saveUser(userData: AuthResponse){
        saveSesionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);