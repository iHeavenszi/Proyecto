import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import type { AccessTokenResponse, AuthResponse, User} from "../types/types";


const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () =>{},
    saveUser: (userData: AuthResponse) => {},
    getRefreshToken : () =>{},
    getUser : () => ({} as User|undefined),
    logout : () => {},
  
});

interface AuthProviderProps {
    children: React.ReactNode;
  }
export function AuthProvider({children}: AuthProviderProps){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();
    //const [refreshToken, setRefreshToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    checkAuth().finally(() => setIsLoading(false));
}, []);

async function checkAuth() {
    const storedAccessToken = localStorage.getItem("AccessToken");
    if (storedAccessToken) {
        setAccessToken(JSON.parse(storedAccessToken)); // Restaura el estado
        setIsAuthenticated(true);
        const storedUser = localStorage.getItem("User");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Restaura el usuario desde el localStorage
        }
    } else {
        const token = getRefreshToken();
        if (token) {
            const newAccessToken = await requestNewAccessToken(token);
            if (newAccessToken) {
                const userInfo = await getUserInfo(newAccessToken);
                if (userInfo) {
                    saveSesionInfo(userInfo, newAccessToken, token);
                }
            }
        }
    }
}

    const logout = () => {
    // Eliminar los datos del localStorage
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
    localStorage.removeItem("Token");

    // Resetear el estado
    setAccessToken("");
    setUser(undefined);
    setIsAuthenticated(false);
    };

    function saveSesionInfo(userInfo: User, accessToken: string, refreshToken: string){
        setAccessToken(accessToken);
        setUser(userInfo);
        localStorage.setItem("AccessToken", JSON.stringify(accessToken));
        localStorage.setItem("Token", JSON.stringify(refreshToken));
        localStorage.setItem("User", JSON.stringify(userInfo));
        setIsAuthenticated(true);

    }

    async function getUserInfo(accessToken: string) {
        try{
            const response = await fetch("http://localhost:4000/api/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${accessToken}`,
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
            console.log("AccessToken:", accessToken);
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
                    authorization: `Bearer ${accessToken}`,
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
        const tokenData = localStorage.getItem("token");
        if (tokenData){
            const token = JSON.parse(tokenData);
            return  token;
        }
            return null;
        
    }

    function getUser(){
        return user;
    }

    function saveUser(userData: AuthResponse){
        saveSesionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser, logout}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);