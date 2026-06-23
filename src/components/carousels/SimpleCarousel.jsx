import './SimpleCarousel.css';
import { useAuth } from '../../Context/AuthContext';
import { Card, Button } from 'react-bootstrap';

const SimpleCarousel = ({ items }) => {
  const { user } = useAuth();

  const safeItems = (items || []).filter(Boolean);

  // Mientras no tengas el formulario conectado, dejamos la alerta
  const handleAgregarProducto = () => {
    alert("Acá se va a abrir el formulario para agregar el nuevo producto");
  };

  return (
    <div className="simple-carousel-wrapper">
      {/* Botón solo para administradores */}
      {user && user.rol === 'admin' && (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <button
            onClick={handleAgregarProducto}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Agregar Producto
          </button>
        </div>
      )}

      {!safeItems.length ? (
        <p style={{ textAlign: 'center' }}>No hay productos disponibles en este momento</p>
      ) : (
        <>
          <div className="simple-carousel-container">
            {safeItems.map((item) => {
              // Determinar la mejor URL de imagen disponible
              const imagenSrc =
                item.imagen ||
                item.imagenDir ||
                item.imageUrl ||
                'https://via.placeholder.com/300x200?text=Sin+imagen';

              return (
                <div key={item.id} className="simple-carousel-slide">
                  <Card style={{ width: '100%', maxWidth: '20rem', margin: '0 auto' }}>
                    <Card.Img
                      variant="top"
                      src={imagenSrc}
                      alt={item.nombre || 'Producto'}
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        maxHeight: '300px',
                        width: '100%',
                      }}
                      onError={(e) => {
                        e.target.onerror = null; // evitar bucle
                        e.target.src =
                          'https://via.placeholder.com/300x200?text=Sin+imagen';
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{item.nombre}</Card.Title>
                      <Card.Text className="fw-bold text-success">
                        ${new Intl.NumberFormat('es-AR').format(item.precio)}
                      </Card.Text>
                      {item.categoriaNombre && (
                        <span className="badge bg-secondary mb-2">
                          {item.categoriaNombre}
                        </span>
                      )}
                      <Button variant="primary">Comprar</Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="simple-carousel-indicators">
            {safeItems.map((_, index) => (
              <div key={index} className="simple-carousel-dot" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleCarousel;