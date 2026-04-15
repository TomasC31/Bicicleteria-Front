import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const Catalogo = ({ items }) => {
  const [modoGrid, setModoGrid] = useState(true);
  
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 1024 },
      items: 3,
      slidesToSlide: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 4
    }
  };

  
  const renderCarousel = () => (
    <Carousel 
      variant="dark" 
      responsive={responsive}
      infinite={true}
      keyBoardControl={false}
      containerClass="carousel-container"
      itemClass="px-2"
      className="mb-4">
      {items.map((item) => (
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

    const renderGrid = () => (
    <Row xs={2} sm={2} md={3} lg={4} className="g-4">
      {items.map((item) => (
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

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-end gap-2 mb-4">

      </div>
      {modoGrid ? renderCarousel() : renderGrid()}
    </Container>
  );
};

export default Catalogo;
