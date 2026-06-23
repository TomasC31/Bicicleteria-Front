import './SimpleCarousel.css';
import { useAuth } from '../../Context/AuthContext';
import { Card, Button } from 'react-bootstrap';

const SimpleCarousel = ({ items }) => {
  const { user } = useAuth();
  const safeItems = (items || []).filter(Boolean);

  const handleAgregarProducto = () => {
    alert("Acá se va a abrir el formulario para agregar el nuevo producto");
  };

  return (
    <div className="simple-carousel-wrapper">
      {/* Botón solo para administradores (corregido a user.rol) */}
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
              const imagenSrc =
                item.imagen ||
                item.imagenDir ||
                item.imageUrl ||
                'https://via.placeholder.com/300x200?text=Sin+imagen';

              return (
                <div key={item.id} className="simple-carousel-slide">
                  {/* Card de Bootstrap que ocupa todo el ancho del slide */}
                  <Card className="w-100">
                    <Card.Img
                      variant="top"
                      src={imagenSrc}
                      alt={item.nombre || 'Producto'}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '300px',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/300x200?text=Sin+imagen';
                      }}
                    />
                    
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Indicadores de slide */}
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