import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginForm from './Components/LoginForm/LoginForm.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import Registro from './Components/LoginForm/Registro.jsx'
import RutaProtegida from './Components/Dashboard/Rutaprotegida.jsx'
import { AuthProvider } from './Components/Auth/AuthProvider.jsx'

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



createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AuthProvider>
        <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
)
