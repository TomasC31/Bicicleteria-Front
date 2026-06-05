import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';
import React, { useState } from 'react';
import AddProductForm from '../AddProductForm';
import ABMProducto from '../ABMProducto'; // Importar el nuevo componente

// Carrusel de múltiples items - Muestra 3-4 productos según el tamaño de pantalla
const MultiItemCarousel = ({ items }) => {
  const { user } = useAuth(); //Traigo al usuario que está logueado para mostrar productos según su rol
  
  const [showForm, setShowForm] = useState(false);
  const [showABMMenu, setShowABMMenu] = useState(false);
  const [carouselItems, setCarouselItems] = useState(items || []);

  const safeItems = (carouselItems || []).filter(Boolean);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4, slidesToSlide: 4 },
    desktop: { breakpoint: { max: 1024, min: 1024 }, items: 3, slidesToSlide: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };

  const handleGestionarProductos = () => {
    setShowABMMenu(true);
  };

  const handleCancelABM = () => {
    setShowABMMenu(false);
  };

  const handleShowAddForm = () => {
    setShowABMMenu(false);
    setShowForm(true);
  };

  const handleModifyProduct = () => {
    console.log("Modificar producto");
    setShowABMMenu(false);
    // Lógica para modificar producto
  };

  const handleDeleteProduct = () => {
    console.log("Eliminar producto");
    setShowABMMenu(false);
    // Lógica para eliminar producto
  };

  const handleAddProduct = (newProduct) => {
    setCarouselItems([...carouselItems, newProduct]);
    setShowForm(false);
  };

  const handleCancelAdd = () => {
    setShowForm(false);
  };

  return (
    <div>
      {user && user.rol === 'admin' && !showABMMenu && !showForm && (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <button 
            onClick={handleGestionarProductos} 
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Gestionar Productos
          </button>
        </div>
      )}

      {showABMMenu && (
        <ABMProducto
          onAdd={handleShowAddForm}
          onModify={handleModifyProduct}
          onDelete={handleDeleteProduct}
          onCancel={handleCancelABM}
        />
      )}

      {showForm && (
        <AddProductForm 
          onAddProduct={handleAddProduct}
          onCancel={handleCancelAdd}
        />
      )}

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
