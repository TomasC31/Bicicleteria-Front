export const usuariosIniciales = [
    {
        Id: 1,
        Nombre: 'David',
        Apellido: 'Pérez',
        mail: 'david.perez@gmail.com',
        password: '123456',
        Rol: 'admin',
    },
    {
        Id: 2,
        Nombre: 'María',
        Apellido: 'Gómez',
        mail: 'maria.gomez@gmail.com',
        password: '1234567',
        Rol: 'user',
    },
    {
        Id: 3,
        Nombre: 'Juan',
        Apellido: 'López',
        mail: 'juan.lopez@gmail.com',
        password: '12345678',
        Rol: 'user',
    }

]
//Verificamos si ya hay usuarios guardados en localStorage, si no los inicializamos
//Intento leer usuarios del localStorage, si no existe, guarda sus datos, sino, no hace nada, y devuelve los usuarios guardados o los iniciales
export const inicializarUsuarios = () => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (!usuariosGuardados) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
    }
}

//Local storage solo guarda strings, por eso hay que usar Json.stringfy para pasar el array a texto y guardarlo, y despues JSON.parse para convertir el texto de vuelta a array cuando lo leo.

//Función para obtener los usuarios desde localStorage
export const getUsuarios = () => {
    return JSON.parse(localStorage.getItem('usuarios'));
}


//Funcion Registro, para recibir los datos del formulario de registro, crear un nuevo usuario y guardarlo en localStorage
export const registrarUsuario = (nombre, apellido, mail, password) => {
    
    //Primero traigo todos los usuarios actuales del LocalStorage
    const usuarios = getUsuarios();

    //Miro si el email ya existe
    const mailExiste = usuarios.find (u => u.mail === mail);
    if(mailExiste){
        return {exito: false, mensaje: "El email ya está registrado"};
    }

    //Creo el nuevo usuario
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        apellido,
        mail,
        password,
        rol: "usuario"
    };

//Lo agrego al array y lo guardo en el LocalStorage
//... Copia todos los usuarios existentes en un array nuevo y le agrega el usuario nuevo al final
    const usuariosActualizados = [...usuarios, nuevoUsuario];
    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
    return {exito: true, mensaje: "Registro exitoso"};
}


//Funcion login, recibe el email y pass, y pa busca en el LS, verifica si coincide
export const loginUsuario = (mail, password) => {
    const usuarios = getUsuarios();

    const usuario = usuarios.find(u => u.mail === mail && u.password === password);
    if(!usuario){
        return {exito: false, mensaje: "Email o contraseña incorrecta"};
    }
    return {exito: true, usuario};
}