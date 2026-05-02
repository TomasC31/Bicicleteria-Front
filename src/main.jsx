import { useState } from "react"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"



import { inicializarUsuarios } from "./Data/Usuarios"
//Inicializo los usuarios antes de REACTDOM para que los usuarios
//Esten cargados en el LS antes de que se renderice cualquier componente
inicializarUsuarios();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
