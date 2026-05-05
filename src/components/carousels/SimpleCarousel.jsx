import './SimpleCarousel.css';

// Carrusel simple sin librerías externas - Usa CSS Scroll Snap
// Muestra 1 item a la vez ocupando el 100% del ancho con scroll horizontal nativo
const SimpleCarousel = ({ items }) => {
  // Filtramos items nulos para evitar errores de renderizado
  const safeItems = (items || []).filter(Boolean);

  // Retorna null si no hay items para mostrar
  if (!safeItems.length) return null;

  return (
    <div className="simple-carousel-wrapper">
      {/* Contenedor del carrusel con CSS Scroll Snap */}
      <div className="simple-carousel-container">
        {/* Mapeamos cada item y lo renderizamos en un slide */}
        {safeItems.map((item) => (
          <div key={item.id} className="simple-carousel-slide">
            {/* Card personalizada sin React Bootstrap */}
            <div className="simple-carousel-card">
              {/* Imagen del producto */}
              {item.imagen && (
                <div className="simple-carousel-image-wrapper">
                  <img src={item.imagen} className="simple-carousel-image"/>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Indicador visual del número de slides (opcional) */}
      <div className="simple-carousel-indicators">
        {safeItems.map((_, index) => (
          <div key={index} className="simple-carousel-dot" />
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;
