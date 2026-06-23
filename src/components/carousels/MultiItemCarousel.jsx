import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Card } from 'react-bootstrap';
import React from 'react';

// Carrusel de múltiples items - Muestra 3-4 productos según el tamaño de pantalla
const MultiItemCarousel = ({ items }) => {
  // Leemos directamente la propiedad 'items'. Ya no usamos useState ni copias internas.
  // Así nos aseguramos de que siempre tenga la última información de la base de datos.
  const safeItems = (items || []).filter(Boolean);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4, slidesToSlide: 4 },
    desktop: { breakpoint: { max: 1024, min: 1024 }, items: 3, slidesToSlide: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };

  // Si la lista está vacía, mostramos un mensaje directamente
  if (!safeItems.length) {
    return <p style={{ textAlign: 'center' }}>No hay productos disponibles en esta sección.</p>;
  }

  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite={true}
        keyBoardControl={false}
        containerClass="carousel-container"
        itemClass="px-2"
        className="mb-4"
        itemAriaLabel="slide"
      >
        {safeItems.map((item) => {
          // Lógica para mostrar imagen por defecto si el producto no tiene una
          const imagenSrc = item.imagen || item.imagenDir || item.imageUrl || 'https://placehold.co/300x200?text=Sin+imagen';
          
          return (
            <div key={item.id} className="d-flex justify-content-center">
              <Card style={{ width: '20rem' }}>
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
                    // Si el link de la imagen está roto, ponemos una de emergencia
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=X';
                  }}
                />
                <Card.Body>
                  <Card.Title>{item.nombre}</Card.Title>
                  <Card.Text>{item.descripcion}</Card.Text>
                  <Card.Text className="fw-bold text-success">
                    Precio: ${new Intl.NumberFormat('es-AR').format(item.precio)}
                  </Card.Text>
                  <Button variant="primary">Comprar</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MultiItemCarousel;