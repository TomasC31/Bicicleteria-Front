import { createContext, useContext, useState, useEffect } from 'react';
//import { loginUsuario } from '../Data/Usuarios'; // Importo la función de login de prueba
import {authAPI} from '../services/api'; // Importo la función de login real del API
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
    const [token, setToken] = useState(() => localStorage.getItem('token') || null); // Estado para almacenar el token de autenticación

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

        const accessToken = data.accessToken; //Aca llega el token de acceso desde el backend
        const userData = {
            id: data.user.id,           // Ajustá según el nombre exacto que venga del backend
            nombre: data.user.firstName, 
            apellido: data.user.lastName,
            mail: data.user.email,
            rol: data.user.roleName
        };

        //DEBUGIN

        localStorage.setItem('token', accessToken); //Guardamos el token en localStorage
        localStorage.setItem('user', JSON.stringify(userData)); //Guardamos el usuario en localStorage como string
        setToken(accessToken); //Actualizo estados
        setUser(userData); 

        } catch (error) {
            
            // El error ya tiene el mensaje del backend (ej. "Credenciales inválidas")
            throw error; // Relanzamos para que LoginComp lo capture y muestre
        }


    };

    const logout = () => {
        //cuando me deslogueo, borro el token y el usuario del ls y actualizo los estados.
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
// Custom hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);