import { useState } from 'react';

//Se encarga del formulario interactivo del login.
//Maneja toda la logica, estado, comportamiento de los datos.

//ValidateForm asegura que el mail tenga el formato correcto.
//useState guarda lo que hay dentro de los inputs y los errores que puedan surgir.

//Importo la funcion loginUsuario que esta dentro de Usuarios.js
import { loginUsuario } from '../Data/Usuarios';

//Permite redirigir al usuario a ptra pagina desde el codigo sin que tenga que hacer click en otro lado
import { useNavigate } from "react-router-dom"


// Componente de Login, recibe estos 2 datos del formulario, y el estado de los errores, este sirve para mostrar el mensaje de error si no completo las casillas
export default function LoginComp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Validaciones
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresá un email válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return newErrors;
  };

// Para redirigir cuando me logueo.
  const navigate = useNavigate();


  // Cuando hago click en loguearse, se ejecuta todo lo que esta dentro de esta funcion.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    
    // Acá tiene que ir la llamada a la API cuando tengamos el backend
    const resultado = loginUsuario(email, password);

    if(!resultado.exito){
      setErrors({submit: resultado.mensaje});
      return;
    }

    console.log("Login exitoso: ", resultado.usuario);
    navigate("/")
  };


  //Este return hace que muestre el formulario del login, con los campos y todo eso.
  //Si llega a haber un error, tambien lo muestra.
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          style={{ borderRadius: '10px' }}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Contraseña</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          style={{ borderRadius: '10px' }}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>
        {errors.submit &&(
          <div className="alert alert-danger mb-3">{errors.submit}</div>
        )}
      <button
        type="submit"
        className="btn btn-lg w-100"
        style={{
          backgroundColor: '#1565C0',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '10px',
          border: 'none',
        }}
      >
        Ingresar
      </button>
    </form>
  );
}