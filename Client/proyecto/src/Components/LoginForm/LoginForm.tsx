import React from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function LoginForm(){

    const auth = useAuth();
    if (auth.isAuthenticated){
        return <Navigate to="/dashboard" />
    }
    return (
        <div className="wrapper">
            <form action="">
                <h1>login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Usuario" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="contraseña" required/>
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Recuerdame</label>
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
            </form>
            <button type="submit">Iniciar sesion</button>
            <div className="register-link">
                <p>¿No tienes una cuenta? <a href="/registro">Registrate!</a></p>
            </div>
        </div>
    );
}