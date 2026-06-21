import React, { useState, useEffect } from 'react';
import CatalogoComp from '../CatalogoComp';
import ABMProducto from '../ABMProducto';
import { productsAPI } from '../../services/api';
import { productos as productosFalsos } from '../../Data/Productos';



/**
 * Vista de administrador.
 * Incluye el ABM de productos y el catálogo completo.
 */
export default function AdminView() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // Cargar productos
  const cargarProductos = async () => {
    try {
      const datosBackend = await productsAPI.getAll();
      const productosTraducidos = datosBackend.map((p) => ({
        id: p.id,
        nombre: p.name,
        descripcion: p.description,
        precio: p.price,
        imagen: p.imageUrl,
      }));
      setProductos(productosTraducidos);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setProductos(productosFalsos);
      setMensaje('No se pudieron cargar los productos. Usando datos locales.');
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // CRUD handlers
  const handleCreate = async (nuevoProducto) => {
    try {
      // El backend espera name, description, price, imageUrl, etc.
      await productsAPI.create({
        name: nuevoProducto.nombre,
        description: nuevoProducto.descripcion,
        price: nuevoProducto.precio,
        imageUrl: nuevoProducto.imagen,
        // si hay categoría, etc.
      });
      setMensaje('Producto creado exitosamente.');
      cargarProductos(); // refrescar lista
    } catch (error) {
      setMensaje(`Error al crear producto: ${error.message}`);
    }
  };

  const handleUpdate = async (id, productoModificado) => {
    try {
      await productsAPI.update(id, {
        name: productoModificado.nombre,
        description: productoModificado.descripcion,
        price: productoModificado.precio,
        imageUrl: productoModificado.imagen,
      });
      setMensaje('Producto actualizado.');
      cargarProductos();
    } catch (error) {
      setMensaje(`Error al actualizar: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await productsAPI.remove(id);
      setMensaje('Producto eliminado.');
      cargarProductos();
    } catch (error) {
      setMensaje(`Error al eliminar: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setModo(null);
    setProductoSeleccionado(null);
    setMensaje('Operación cancelada.');
  }

  return (
    <div>
      {mensaje && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {mensaje}
          <button type="button" className="btn-close" onClick={() => setMensaje('')}></button>
        </div>
      )}

      <ABMProducto 
        onAdd={handleCreate} 
        onModify={handleUpdate} 
        onDelete={handleDelete} 
        onCancel={handleCancel}
      />

      <hr />

      <div className="container mt-4">
        <h1 className="mb-4">Anuncios</h1>
        <CatalogoComp items={productos} type="simple" />
      </div>

      <div className="home-page">
        <div className="container mt-4">
          <h1 className="mb-4">Bicicletas</h1>
          <CatalogoComp items={productos} type="multi" />
        </div>

        <div className="container mt-4">
          <h1 className="mb-4">Partes</h1>
          <CatalogoComp items={productos} type="multi" />
        </div>
      </div>
    </div>
  );
}