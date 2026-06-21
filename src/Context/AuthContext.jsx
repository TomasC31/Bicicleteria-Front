import { createContext, useContext, useState, useEffect } from 'react';
//import { loginUsuario } from '../Data/Usuarios'; // Importo la función de login de prueba
import {authAPI} from '../services/api'; // Importo la función de login real del API
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

        // Bloquear cualquier intento de logout automático mientras se está en la página de login
    useEffect(() => {
        if (window.location.pathname === '/login') {
            // No permitir que se ejecute logout por falta de token estando en login
            return;
        }
    }, [token]);

    const login = async (mail, password) => {
    try {
        const data = await authAPI.login(mail, password);
        // data = { accessToken: string, usuario: object }

        const accessToken = data.accessToken;
        const userData = {
            id: data.user.id,           // Ajustá según el nombre exacto que venga del backend
            nombre: data.user.firstName,
            apellido: data.user.lastName,
            mail: data.user.email,
            rol: data.user.roleName
        };

        //DEBUGIN

        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(accessToken);
        setUser(userData);

        } catch (error) {
            
            // El error ya tiene el mensaje del backend (ej. "Credenciales inválidas")
            throw error; // Relanzamos para que LoginComp lo capture y muestre
        }


    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);