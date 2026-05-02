
import { Container, Row, Col, Card } from 'react-bootstrap';

import RegisterComp from '../components/RegisterComp.jsx';


export default function RegisterPag() {
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)', backgroundColor: 'white', overflow: 'auto' }}>

      {/* Formulario centrado */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 0',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '450px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '0.3rem', color: '#111', textAlign: 'center' }}>
            Crear Cuenta
          </h2>
          <p style={{ color: '#888', marginBottom: '2rem', textAlign: 'center' }}>
            Completá tus datos para registrarte
          </p>

          <RegisterComp />

        </div>
      </div>
    </div>
  );
}