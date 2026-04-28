import { Container, Row, Col, Card } from 'react-bootstrap';
import RegisterComp from '../components/RegisterComp.jsx';

export default function RegisterPag() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header className="bg-dark text-white">
              <Card.Title className="mb-0">Crear Cuenta</Card.Title>
            </Card.Header>
            <Card.Body className="bg-light">
              <RegisterComp />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}