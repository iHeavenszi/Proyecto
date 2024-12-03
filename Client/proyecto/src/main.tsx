import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginForm from './Components/LoginForm/LoginForm.tsx'
import Dashboard from './Components/Dashboard/Dashboard.tsx'
import Registro from './Components/LoginForm/Registro.tsx'
import RutaProtegida from './Components/Dashboard/Rutaprotegida.tsx'
import { AuthProvider } from './Components/Auth/AuthProvider.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />
  },
  {
    path: "/",
    element: <RutaProtegida />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
    ],
  },
  {
    path: "/registro",
    element: <Registro />
  },
]);



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);