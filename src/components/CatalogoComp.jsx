import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Container, Row, Col, Card } from 'react-bootstrap';


//Home pag pasa los items como propiedades y aca los muestro.
const Catalogo = ({ items }) => {
  // Estado para controlar el modo de visualización (grid o carousel)
  const [modoGrid] = useState(false);

  // Filtramos los items para asegurarnos de que no hayan elementos nulos
  const safeItems = (items || []).filter(Boolean);


  // Configuración de responsive para el carousel
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4, slidesToSlide: 4 },
    desktop: { breakpoint: { max: 1024, min: 1024 }, items: 3, slidesToSlide: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };

  // Función para renderizar el carousel
  const renderCarousel = () => (
    <Carousel
      responsive={responsive}
      infinite={true}
      keyBoardControl={false}
      containerClass="carousel-container"
      itemClass="px-2"
      className="mb-4"
      itemAriaLabel="slide"

      // El safeItems.length se asegura de que el carousel solo se renderice si hay items válidos (que no hayan null)
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

  //Renderizamos el grid
  const renderGrid = () => (
    <Row xs={2} sm={2} md={3} lg={4} className="g-4">
      {safeItems.map((item) => (
        <Col key={item.id}>
          <Card className="h-100">
            {item.imagen && <Card.Img variant="top" src={item.imagen} alt={item.nombre} />}
            <Card.Body>
              <Card.Title>{item.nombre}</Card.Title>
              <Card.Text>{item.descripcion}</Card.Text>
              <Card.Text className="fw-bold">Precio: {item.precio}</Card.Text>
              <Button variant="primary">Comprar</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  // Si no hay items válidos, no renderizamos nada
  if (!safeItems.length) return null;


  // Renderizamos el componente dependiendo del modo seleccionado (grid o carousel)
  return (
    <Container className="mt-4">
      {modoGrid ? renderGrid() : renderCarousel()}
    </Container>
  );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default Catalogo;
