import { useState } from 'react';

//Importo la funcion loginUsuario que esta dentro de Usuarios.js
import { loginUsuario } from '../Data/Usuarios';

//Permite redirigir al usuario a ptra pagina desde el codigo sin que tenga que hacer click en otro lado
import { useNavigate } from "react-router-dom"

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


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

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