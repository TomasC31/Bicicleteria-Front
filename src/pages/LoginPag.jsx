import LoginComp from '../components/LoginComp';

export default function LoginPag() {
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)', backgroundColor: 'white', overflow: 'hidden' }}>

      {/* Líneas verticales de colores */}
      <div style={{ display: 'flex', flexDirection: 'row', width: '60px', height: '100%', gap: '6px', padding: '0 8px', flexShrink: 0 }}>
        <div style={{ flex: 1, backgroundColor: '#1565C0' }} />
        <div style={{ flex: 1, backgroundColor: '#C62828' }} />
        <div style={{ flex: 1, backgroundColor: '#F9A825' }} />
        <div style={{ flex: 1, backgroundColor: '#2E7D32' }} />
      </div>

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

          <LoginComp />

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