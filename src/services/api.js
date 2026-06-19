const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
    // headers
    const headers = new Headers(options.headers || {});

    // Adjuntar token JWT si existe
    const token = localStorage.getItem('token');
    if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    }
    
    // se asume un JSON si no se indica el CONTENT-TYPE
    if (!headers.has('Content-Type') && options.body) {
        headers.set('Content-Type', 'application/json');
    }

    //cargamos la configuracio de  la peticíon
    const config = {
        ...options,
        headers,
    };

    // si el body es un objeto, convertir a JSON
    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    // cargamos una llamada al fetch con la url a la api
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    //respuesta de una sesion expirada
    if (response.status === 401){
        localStorage.removeItem('token')
        Console.log('Session expirada, redirigiendo a login');
    }
    if(window.location.pathname != '/login'){
          // redirigimos a loggin
        window.location.href = '/login';
        consle.log('Redirigiendo a login');
        
    }

    throw new Error('Session expirada')

    // Manejo de error 204
    if (response.status === 204) {
        return null;
    }

    // paarse de cuerpo a JSON
    const data = await response.json();

    // ERROR PAR RESPUESTA SIN EXITO
    if (!response.ok) {
        const mensajeError = `Error ${response.status} - ${data?.title || ''} - ${data?.message || ''}`;
        throw new Error(mensajeError);
    }

    return data;
}

export { request };

window.request = request;