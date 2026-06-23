import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const GridLayout = ({ items }) => {
  const safeItems = (items || []).filter(Boolean);

  if (!safeItems.length) return null;

  return (
    <Container>
      <Row xs={2} sm={2} md={3} lg={4} className="g-4">
        {safeItems.map((item) => {
          // Determinar la mejor URL de imagen disponible
          const imagenSrc =
            item.imagen ||
            item.imagenDir ||
            item.imageUrl ||
            'https://placehold.co/300x200?text=Sin+imagen';

          return (
            <Col key={item.id}>
              <Card className="h-100">
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
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
                  }}
                />
                <Card.Body>
                  <Card.Title>{item.nombre}</Card.Title>
                  <Card.Text className="fw-bold text-success">
                    ${new Intl.NumberFormat('es-AR').format(item.precio)}
                  </Card.Text>
                  {item.categoriaNombre && (
                    <span className="badge bg-secondary mb-2">{item.categoriaNombre}</span>
                  )}
                  <Button variant="primary">Comprar</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default GridLayout;