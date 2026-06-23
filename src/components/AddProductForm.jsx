import React, { useState, useEffect } from 'react';
import './AddProductForm.css';
import { categoriesAPI } from '../services/api';

const AddProductForm = ({ onSave, onCancel, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [listaCategorias, setListaCategorias] = useState([]);

  // campo para URL de imagen manual
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrlError, setImageUrlError] = useState('');
  const [priceError, setPriceError] = useState('');

  // Cargar categorías al montar
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const datos = await categoriesAPI.getAll();
        setListaCategorias(datos || []);
      } catch (error) {
        console.error("No se pudieron cargar las categorías:", error);
        setListaCategorias([]);
      }
    };
    obtenerCategorias();
  }, []);

  // Cargar datos si estamos editando
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.nombre || '');
      setDescription(productToEdit.descripcion || '');
      setPrice(productToEdit.precio || '');
      setCategoryId(productToEdit.categoriaId || '');

      const imgExistente = productToEdit.imagen || productToEdit.imagenDir || productToEdit.imageUrl || '';
      setImagePreview(imgExistente);
      setImageUrl(imgExistente);
    }
  }, [productToEdit]);

  // Manejar subida de archivo
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageUrl(''); // limpiamos URL manual si se sube archivo
      setImageUrlError('');
    }
  };

  // Manejar cambio en URL de imagen
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImageUrlError('');

    if (url && /^https?:\/\//.test(url)) {
      if (url.length > 500) {
        setImageUrlError('La URL es demasiado larga (máx. 500 caracteres).');
        setImagePreview('');
        return;
      }
      setImagePreview(url);
      setImage(null); // limpiamos archivo si se pega URL
    } else if (url && !/^https?:\/\//.test(url)) {
      setImagePreview('');
    } else {
      setImagePreview('');
    }
  };

  // Validación de precio
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    setPriceError('');

    const num = parseFloat(value);
    if (!isNaN(num) && num > 999999.99) {
      setPriceError('El precio no puede superar 999.999,99');
    }
  };

  // Validar URL de imagen
  const validarImagenUrl = () => {
    if (imageUrl && !/^https?:\/\//.test(imageUrl)) {
      setImageUrlError('La URL debe comenzar con http:// o https://');
      return false;
    }
    if (imageUrl && imageUrl.length > 500) {
      setImageUrlError('La URL es demasiado larga (máx. 500 caracteres).');
      return false;
    }
    return true;
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar precio máximo
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setPriceError('Ingrese un precio válido.');
      return;
    }
    if (numPrice > 999999.99) {
      setPriceError('El precio no puede superar 999.999,99');
      return;
    }

    if (!validarImagenUrl()) return;

    const productData = {
      // Solo incluimos id si estamos editando
      ...(productToEdit && { id: productToEdit.id }),
      nombre: name,
      descripcion: description,
      precio: numPrice,
      imagen: imagePreview,                     // preview actual (archivo o URL)
      imagenDir: imageUrl || imagePreview,       // URL completa para el backend
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
            onChange={handlePriceChange}
            required
            className={priceError ? 'is-invalid' : ''}
          />
          {priceError && (
            <small className="text-danger">{priceError}</small>
          )}
        </div>

        {/* Subida de archivo */}
        <div className="form-group">
          <label>Subir Imagen</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        {/* Campo de URL de imagen */}
        <div className="form-group">
          <label>O pegar URL de Imagen</label>
          <input
            type="url"
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            className={imageUrlError ? 'is-invalid' : ''}
          />
          {imageUrlError && (
            <small className="text-danger">{imageUrlError}</small>
          )}
          <small className="text-muted d-block">
            Debe comenzar con http:// o https:// (máx. 500 caracteres)
          </small>
        </div>

        {/* Vista previa */}
        {imagePreview && (
          <div className="image-preview-wrapper" style={{ marginTop: '15px', textAlign: 'center' }}>
            <img
              src={imagePreview}
              alt="Vista previa"
              className="image-preview"
              style={{
                maxWidth: '100%',
                maxHeight: '250px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/300x200?text=Sin+imagen';
              }}
            />
          </div>
        )}

        <div className="form-actions">
          <button type="submit">
            {productToEdit ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;