import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './pages/Login/Login.jsx';
import MarcarConsulta from './pages/MarcarConsulta/MarcarConsulta.jsx';
import './index.scss';


const router = createBrowserRouter([
  { path: '', element: <App/>},
  { path: 'login/', element: <Login /> },
  { path: 'marcar-consulta/', element:<MarcarConsulta />},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
