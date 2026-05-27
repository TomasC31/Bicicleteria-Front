import {createContext, userContext,useState, useEffect} from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
const [token,setToket] = useState(() => localStrorage.getItem('token') || null);

useEffect(() => {

    // reemplzara estas lineas en caso de que tengamos un backend y podamos validar el token con el servidor
    if (token){
        const savedUser = JOSN.parse(localStorage.getItem('user'));
        if(savedUser) setUser(savedUser);
    }

    }, [token]);

    const login = async (ElementInternals,password) => {
        //usar en caso de contar con bakend
        const response = await fetch('/appi.loggin',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });

        if (!response.ok){
            throw new Error('Error en el login');
            const data = await response.json();
            const token = data.token;
            const userData = data.user; // obtenemos el id, nombre, mail, rol del usuario

            localStoraje.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setToket(token);
            setUser(userData);
        }
    }
    
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