import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';

// Carrusel de múltiples items - Muestra 3-4 productos según el tamaño de pantalla
const MultiItemCarousel = ({ items }) => {
  const { user } = useAuth(); //Traigo al usuario que está logueado para mostrar productos según su rol
  const safeItems = (items || []).filter(Boolean);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4, slidesToSlide: 4 },
    desktop: { breakpoint: { max: 1024, min: 1024 }, items: 3, slidesToSlide: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };

const handleAgregarProducto = () => {
  alert("Aca se va a abrir el formulario para agregar el producto")
}

return (
    <div>
      {/* BOTON SOLO PARA EL ADMINISTRADOR */}
      {user && user.rol === 'admin' && (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <button 
            onClick={handleAgregarProducto} 
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          > Agregar Nuevo Producto </button>
        </div>
      )}
      {/* ================================================ */}

      {!safeItems.length ? (
        <p style={{ textAlign: 'center' }}>No hay productos disponibles en esta sección.</p>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          keyBoardControl={false}
          containerClass="carousel-container"
          itemClass="px-2"
          className="mb-4"
          itemAriaLabel="slide"
        >
          {safeItems.map((item) => (
            <div key={item.id} className="d-flex justify-content-center">
              <Card style={{ width: '20rem' }}>
                {item.imagen && <Card.Img variant="top" src={item.imagen} alt={item.nombre} />}
                <Card.Body>
                  <Card.Title>{item.nombre}</Card.Title>
                  <Card.Text>{item.descripcion}</Card.Text>
                  <Card.Text className="fw-bold">Precio: {item.precio}</Card.Text>
                  <Button variant="primary">Comprar</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MultiItemCarousel;
