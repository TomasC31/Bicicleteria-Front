import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';
import React, { useState } from 'react';
import AddProductForm from '../AddProductForm';
import ABMProducto from '../ABMProducto';
import DeleteProductList from '../DeleteProductList';
import ModifyProductList from '../ModifyProductList';

// Carrusel de múltiples items - Muestra 3-4 productos según el tamaño de pantalla
const MultiItemCarousel = ({ items }) => {
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [showABMMenu, setShowABMMenu] = useState(false);
  const [showDeleteList, setShowDeleteList] = useState(false);
  const [showModifyList, setShowModifyList] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [carouselItems, setCarouselItems] = useState(items || []);

  const safeItems = (carouselItems || []).filter(Boolean);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4, slidesToSlide: 4 },
    desktop: { breakpoint: { max: 1024, min: 1024 }, items: 3, slidesToSlide: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };

  const handleGestionarProductos = () => setShowABMMenu(true);
  const handleCancelABM = () => setShowABMMenu(false);

  const handleShowAddForm = () => {
    setProductToEdit(null);
    setShowABMMenu(false);
    setShowForm(true);
  };

  const handleShowModifyList = () => {
    setShowABMMenu(false);
    setShowModifyList(true);
  };

  const handleSelectProductToModify = (product) => {
    setProductToEdit(product);
    setShowModifyList(false);
    setShowForm(true);
  };

  const handleCancelModify = () => {
    setShowModifyList(false);
  };

  const handleShowDeleteList = () => {
    setShowABMMenu(false);
    setShowDeleteList(true);
  };

  const handleCancelDelete = () => setShowDeleteList(false);

  const handleDeleteProduct = (productId) => {
    setCarouselItems(carouselItems.filter(item => item.id !== productId));
  };

  const handleSaveProduct = (productData) => {
    if (productToEdit) {
      setCarouselItems(carouselItems.map(item => item.id === productData.id ? productData : item));
    } else {
      setCarouselItems([...carouselItems, productData]);
    }
    setShowForm(false);
    setProductToEdit(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setProductToEdit(null);
  };

  return (
    <div>
      {user && user.rol === 'admin' && !showABMMenu && !showForm && !showDeleteList && !showModifyList && (
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
          onModify={handleShowModifyList}
          onDelete={handleShowDeleteList}
          onCancel={handleCancelABM}
        />
      )}

      {showForm && (
        <AddProductForm
          onSave={handleSaveProduct}
          onCancel={handleCancelForm}
          productToEdit={productToEdit}
        />
      )}

      {showDeleteList && (
        <DeleteProductList
          items={safeItems}
          onDelete={handleDeleteProduct}
          onCancel={handleCancelDelete}
        />
      )}

      {showModifyList && (
        <ModifyProductList
          items={safeItems}
          onSelect={handleSelectProductToModify}
          onCancel={handleCancelModify}
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
                  <Card.Text className="fw-bold"> Precio: ${new Intl.NumberFormat('es-AR').format(item.precio)}
                  </Card.Text>
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
