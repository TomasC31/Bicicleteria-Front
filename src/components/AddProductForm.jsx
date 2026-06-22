import React, { useState, useEffect } from 'react';
import './AddProductForm.css';
// Importamos categoriesAPI para traer las categorias reales de la base de datos
import { categoriesAPI } from '../services/api';

const AddProductForm = ({ onSave, onCancel, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // ESTADOS NUEVOS: Uno para guardar la seleccion y otro para listar todas las opciones
  const [categoryId, setCategoryId] = useState('');
  const [listaCategorias, setListaCategorias] = useState([]);

  // useEffect Nuevo: Va a buscar las categorias al servidor apenas abre el formulario
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const datos = await categoriesAPI.getAll();
        setListaCategorias(datos || []);
      } catch (error) {
        console.error("No se pudieron cargar las categorias:", error);
        // Plan B: Si falla la red de Alan, dejamos unas basicas fijas por seguridad
        setListaCategorias([
          { id: 2, name: 'Bicicletas' },
          { id: 3, name: 'Partes' }
        ]);
      }
    };
    obtenerCategorias();
  }, []);

  // Si cambia productToEdit (modo modificar), llenamos tambien el campo de la categoria
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.nombre);
      setDescription(productToEdit.descripcion);
      setPrice(productToEdit.precio);
      setImage(productToEdit.imagen);
      setImagePreview(productToEdit.imagen);
      // Guardamos la categoria que ya tenia asignada
      setCategoryId(productToEdit.categoriaId || '');
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
      // Pasamos el ID de la categoria elegida convertido a numero entero
      categoriaId: parseInt(categoryId), 
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

        {/* INPUT NUEVO: Selector de Categorias */}
        <div className="form-group">
          <label>Categoría</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="form-control"
          >
            <option value="">-- Selecciona una Categoría --</option>
            {listaCategorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
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