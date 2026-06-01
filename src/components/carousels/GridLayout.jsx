import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Grid - Muestra productos en formato grid
const GridLayout = ({ items }) => {
  const safeItems = (items || []).filter(Boolean);

  if (!safeItems.length) return null;

  return (
    <Container>
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
    </Container>
  );
};

export default GridLayout;
