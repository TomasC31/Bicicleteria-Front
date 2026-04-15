import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const Catalogo = ({ items }) => {
  const [modoGrid, setModoGrid] = useState(true);
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

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
  
  const renderCarousel = () => (
    <Carousel 
      variant="dark" 
      responsive={responsive}
      infinite={true}
      autoPlay={false}
      keyBoardControl={true}
      containerClass="carousel-container"
      itemClass="px-2"
      className="mb-4">
      {items.map((item) => (
        <div key={item.id} className="d-flex justify-content-center">
          <Card style={{ width: '22rem' }}>
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

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-end gap-2 mb-4">

      </div>
      {modoGrid ? renderCarousel() : renderGrid()}
    </Container>
  );
};

export default Catalogo;
