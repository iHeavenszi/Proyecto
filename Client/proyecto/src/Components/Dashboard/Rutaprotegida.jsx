import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";



const RutaProtegida = () => {
      const auth = useAuth()
    
      return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />
      console.log("Estado de autenticación:", isAuthenticated);
};

export default RutaProtegida;