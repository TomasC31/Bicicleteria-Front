import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { registrarUsuario } from '../Data/Usuarios';

const RegisterComp = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    mail: '',
    password: '',
    confirmPassword: ''
  });

  // Estado para errores
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    
    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    } else if (formData.apellido.length < 3) {
      newErrors.apellido = 'El apellido debe tener al menos 3 caracteres';
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.mail) {
      newErrors.mail = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.mail)) {
      newErrors.mail = 'Ingresa un email válido';
    }
    
    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return newErrors;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Aquí haces la llamada a tu API/backend
    const resultado = registrarUsuario(formData.nombre, formData.apellido, formData.mail, formData.password);

    if(resultado.exito){
      setSuccessMessage('Registro exitoso. Redirigiendo al login...');
      setFormData({nombre: '', apellido: '', mail: '', password: '', confirmPassword: ''});
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else{
      setErrors({submit: resultado.mensaje || 'Error al registrar usuario'});
    }
  };
  return (
    <>
      {/* Mensaje de éxito */}
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}
      
      {/* Error general */}
      {errors.submit && (
        <Alert variant="danger" onClose={() => setErrors({...errors, submit: ''})} dismissible>
          {errors.submit}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        {/* Nombre */}
        <Form.Group className="mb-2" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            isInvalid={!!errors.nombre}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>
        
        {/* Apellido */}
        <Form.Group className="mb-2" controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
            isInvalid={!!errors.apellido}
          />
          <Form.Control.Feedback type="invalid">
            {errors.apellido}
          </Form.Control.Feedback>
        </Form.Group>
        
        {/* Email */}
        <Form.Group className="mb-2" controlId="formEmail">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            isInvalid={!!errors.mail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.mail}
          </Form.Control.Feedback>
        </Form.Group>
        
        {/* Contraseña */}
        <Form.Group className="mb-2" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        
        {/* Confirmar Contraseña */}
        <Form.Group className="mb-2" controlId="formConfirmPassword">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        
        {/* Botones */}
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            Registrarse
          </Button>
          <Button variant="link" onClick={() => window.location.href='/login'}>
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RegisterComp;