import { createContext, useContext, useState, useEffect } from 'react';
import { loginUsuario } from '../Data/Usuarios'; // Importo la función de login de prueba

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null); 
    const [token, setToken] = useState(() => localStorage.getItem('token') || null); 

    useEffect(() => {
        if (token) {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser) setUser(savedUser);
        }
    }, [token]);

    const login = async (mail, password) => {
        // MOCK TEMPORAL: Usamos tu archivo Usuarios.js en vez del fetch al backend
        const resultado = loginUsuario(mail, password);

        if (!resultado.exito) {
            throw new Error(resultado.mensaje);
        }

        // Mapeamos los datos locales para que tengan el formato exacto que tendrá tu API en el futuro
        const userData = {
            id: resultado.usuario.Id,
            nombre: resultado.usuario.Nombre,
            apellido: resultado.usuario.Apellido,
            mail: resultado.usuario.mail,
            rol: resultado.usuario.Rol 
        };
        const accessToken = "token_de_prueba_12345"; // Simulo un token JWT

        localStorage.setItem('token', accessToken); 
        localStorage.setItem('user', JSON.stringify(userData)); 
        setToken(accessToken); 
        setUser(userData); 
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