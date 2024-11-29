import React from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";



const Registro = () => {
    const auth = useAuth();
    if (auth.isAuthenticated){
        return <Navigate to="/dashboard" />
    }
    return (
        <div className="wrapper">
            <form action="">
                <h1>Registro</h1>
                <div className="input-box">
                    <input type="text" placeholder="Ingresa un usuario nuevo" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Ingresa contraseña" required/>
                    <FaLock className="icon" />
                </div>
                
            </form>
            <button type="submit">Registrar</button>
            <div className="register-link">
                <p>¿Ya tienes cuenta? <a href="#">Inicia sesion!</a></p>
            </div>
        </div>
    );
};

export default Registro;