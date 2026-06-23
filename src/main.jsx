import { useState } from "react"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import { request } from './services/api';

import { AuthProvider } from './Context/AuthContext'; // Para envolver la app con el contexto de autenticación




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envuelvo la app con el AuthProvider para que toda la app tenga acceso al contexto de autenticación */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
