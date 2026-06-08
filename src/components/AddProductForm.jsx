import React, { useState, useEffect } from 'react';
import './AddProductForm.css';

const AddProductForm = ({ onSave, onCancel, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.nombre);
      setDescription(productToEdit.descripcion);
      setPrice(productToEdit.precio);
      setImage(productToEdit.imagen);
      setImagePreview(productToEdit.imagen);
    }
  }, [productToEdit]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      id: productToEdit ? productToEdit.id : Date.now(),
      nombre: name,
      descripcion: description,
      precio: parseFloat(price),
      imagen: imagePreview,
    };
    onSave(productData);
  };

  return (
    <div className="add-product-form-container">
      <form onSubmit={handleSubmit}>
        <h2>{productToEdit ? 'Modificar Producto' : 'Agregar Nuevo Producto'}</h2>
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
            accept="image/*"
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>
        <div className="form-actions">
          <button type="submit">{productToEdit ? 'Guardar Cambios' : 'Agregar Producto'}</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
