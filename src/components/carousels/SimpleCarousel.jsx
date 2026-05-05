import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Card } from 'react-bootstrap';

// Carrusel simple - Muestra 1 item a la vez
const SimpleCarousel = ({ items }) => {
  const safeItems = (items || []).filter(Boolean);

  const simpleResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
      slidesToSlide: 1
    },
  };

  if (!safeItems.length) return null;

  return (
    <Carousel
      responsive={simpleResponsive}
      infinite={true}
      itemClass="px-2"
      className="mb-4"
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
  );
};

export default SimpleCarousel;
