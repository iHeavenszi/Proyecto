import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import type { AuthResponse, User } from "../types/types";


const AuthContext = createContext({
    isAuthenticated: false,
});

interface AuthProviderProps {
    children: React.ReactNode;
  }
export function AuthProvider({children}: AuthProviderProps){

    const [isAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);