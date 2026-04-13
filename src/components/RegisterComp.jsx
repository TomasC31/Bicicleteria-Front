import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

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
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }
    
    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    } else if (formData.apellido.length < 2) {
      newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Aquí haces la llamada a tu API/backend
    try {
      // Ejemplo de envío a API
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          mail: formData.mail,
          password: formData.password
        }),
      });
      
      if (response.ok) {
        setSuccessMessage('¡Registro exitoso! Redirigiendo al login...');
        // Limpiar formulario
        setFormData({
          nombre: '',
          apellido: '',
          mail: '',
          password: '',
          confirmPassword: ''
        });
        // Redirigir después de 2 segundos
        setTimeout(() => {
          // window.location.href = '/login';
          console.log('Redirigir al login');
        }, 2000);
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || 'Error en el registro' });
      }
    } catch (error) {
      setErrors({ submit: 'Error de conexión. Intenta nuevamente' });
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
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre *</Form.Label>
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
        <Form.Group className="mb-3" controlId="formApellido">
          <Form.Label>Apellido *</Form.Label>
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
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Correo Electrónico *</Form.Label>
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
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña *</Form.Label>
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
        <Form.Group className="mb-4" controlId="formConfirmPassword">
          <Form.Label>Confirmar Contraseña *</Form.Label>
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