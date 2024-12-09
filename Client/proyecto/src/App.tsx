import LoginForm from "./Components/LoginForm/LoginForm.tsx";
import Navbar from "./Components/Navbar/Navbar.tsx";
import { Outlet } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div>
      <Navbar /> {/* Navbar global */}
      <Outlet /> {/* Renderiza el contenido de la ruta actual */}
    </div>
  );
}

export default App;
