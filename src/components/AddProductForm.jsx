import React, { useState } from 'react';
import './AddProductForm.css';


// Formulario para agregar un nuevo producto, se muestra solo para el admin cuando hace click en el boton de agregar producto, se comunica con el componente MultiItemCarousel para agregar el nuevo producto al carrousel.
const AddProductForm = ({ onAddProduct, onCancel }) => {
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  
  //Maneja el cambio de la imagen, pasa el archivo seleccionado a un URL para poder mostrarlo en el carrousel, se ejecuta cuando selecciono una imagen en el form.
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(), // Simple unique ID
      nombre: name,
      descripcion: description,
      precio: parseFloat(price),
      imagen: image,
    };
    onAddProduct(newProduct);
  };

  return (
    <div className="add-product-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Agregar Nuevo Producto</h2>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
            accept="image/*"
          />
        </div>
        <div className="form-actions">
          <button type="submit">Agregar Producto</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
