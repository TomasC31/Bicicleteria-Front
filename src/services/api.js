const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
    console.log('0. request:', endpoint, options);//debugin

    // headers
    const headers = new Headers(options.headers || {});

    // Adjuntar token JWT si existe
    // Adjuntar token JWT si existe Y NO ESTAMOS EN LOGIN
    const token = localStorage.getItem('token');
    if (token && !endpoint.includes('/Auth/login')) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log('1.Token adjuntado:', token);
    }
    console.log('1.Token adjuntado:', token); // Debugging: Verificar si el token se adjunta correctamente
    // se asume un JSON si no se indica el CONTENT-TYPE
    if (!headers.has('Content-Type') && options.body) {
        headers.set('Content-Type', 'application/json');
    }

    //cargamos la configuracio de  la peticíon
    const config = {
        ...options,
        headers,
    };
    console.log('2. Configuración de la petición:', config); // Debugging: Verificar la configuración final de la petición
    // si el body es un objeto, convertir a JSON
    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    // cargamos una llamada al fetch con la url a la api
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    // respuesta de una sesión expirada
    if (response.status === 401) {
        // Si es el endpoint de login, devolver error de credenciales
        if (endpoint.includes('/Auth/login')) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Credenciales inválidas');
        }

        // Para otros endpoints, sesión expirada: limpiar token y redirigir a login
        localStorage.removeItem('token');
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        throw new Error('Sesión expirada');
    }

    console.log('3. Respuesta del servidor:', response); // Debugging: Verificar la respuesta del servidor

    // Manejo de respuesta sin contenido
    if (response.status === 204) {
        return null;
    }

    // parsear cuerpo a JSON
    const data = await response.json().catch(() => null);

    // manejo de errores HTTP
    if (!response.ok) {
        const mensajeError = `Error ${response.status} - ${data?.title || ''} - ${data?.message || ''}`;
        throw new Error(mensajeError);
    }

    return data;
}


const login = (mail, password) =>
  request('/Auth/login', {
    method: 'POST',
    body: { email: mail, password }
    
  });

const register = (data) =>
  request('/Auth/register', {
    method: 'POST',
    body: data
  });

export { request };

export const authAPI = { login, register };

window.request = request;
window.authAPI = authAPI;
