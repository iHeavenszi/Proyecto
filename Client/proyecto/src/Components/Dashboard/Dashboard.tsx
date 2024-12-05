import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import LogoutButton from "../Auth/LogoutButton";

const Dashboard = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    // Este useEffect es para detectar cuando el usuario esté cargado y listo
    useEffect(() => {
        if (auth.getUser()) {
            setIsLoading(false); // Si el usuario ya está en el contexto, dejamos de cargar
        }
    }, [auth]);

    if (isLoading) {
        return <div>Loading...</div>; // Puedes personalizar este mensaje de carga
    }

    return (
        <div>
        <h1>Dashboard de {auth.getUser()?.name || "Usuario no encontrado"}</h1>
        <LogoutButton />
        </div>
    );
};

export default Dashboard;
