import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)', backgroundColor: 'white', overflow: 'hidden' }}>

      {/* Formulario centrado */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '0.3rem', color: '#111', textAlign: 'center' }}>
            Iniciar Sesión
          </h2>
          <p style={{ color: '#888', marginBottom: '2rem', textAlign: 'center' }}>
            Ingresá tus datos para continuar
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Contraseña</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: '10px' }}
              />
            </div>

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

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888' }}>
            ¿No tenés cuenta?{' '}
            <a href="/register" style={{ color: '#1565C0', fontWeight: 'bold', textDecoration: 'none' }}>
              Registrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}