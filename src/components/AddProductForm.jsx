import React, { useState, useEffect } from 'react';
import './AddProductForm.css';


// Se usa para agregar o modificar un producto, cuando guardamos, se llama a onSave y onCancel para cerrar el form sin guardar nada.
const AddProductForm = ({ onSave, onCancel, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');


  // Si productToEdit cambia, se actualizan los campos del formulario, esto es mueno porque me muestra la info que ya existe.
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.nombre);
      setDescription(productToEdit.descripcion);
      setPrice(productToEdit.precio);
      setImage(productToEdit.imagen);
      setImagePreview(productToEdit.imagen);
    }
  }, [productToEdit]);


  //Cuando el usuario elige una imagen, se guarda el archivo y se crea una vista previa para mostrarla en el form.
  //El if hace que solo se ejecute si el usuario selecciona un archivo.
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]; // obtengo el archivo que seleccioné
      setImage(file); // Guardo el archivo para enviarlo al back
      setImagePreview(URL.createObjectURL(file)); // Creo una URL temporal para mostrar la vista previa de la imagen
    }
  };

  // Cuando el usuario envia el form, se crea un objeto con los datos del producto.
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      id: productToEdit ? productToEdit.id : Date.now(), // Si estoy editando, mantengo el mismo ID, sino creo uno nuevo con Date.now()
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
