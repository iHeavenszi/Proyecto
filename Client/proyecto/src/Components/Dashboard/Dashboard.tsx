import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import LogoutButton from "../Auth/LogoutButton";
import '../../../src/app.css';

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
       <h1></h1>
    );
};

export default Dashboard;
