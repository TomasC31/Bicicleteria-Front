import React, { useState, useEffect } from 'react';
import CatalogoComp from '../CatalogoComp';
import ABMProducto from '../ABMProducto';
import { productsAPI } from '../../services/api';
import { productos as productosFalsos } from '../../Data/Productos';

/**
 * Vista de administrador.
 * Incluye el menú ABM y formularios dinámicos para crear, modificar y eliminar productos.
 * Respeta el componente ABMProducto original (sin modificarlo).
 */
export default function AdminView() {
  const [productos, setProductos] = useState([]);
  const [modo, setModo] = useState(null); // 'add', 'modify', 'delete', 'editForm'
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
  });

  // ---------- Cargar productos ----------
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
      setMensaje('Usando datos locales.');
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // ---------- Handlers para ABMProducto ----------
  const handleAdd = () => {
    setFormData({ nombre: '', descripcion: '', precio: '', imagen: '' });
    setModo('add');
  };

  const handleModify = () => {
    setModo('modify'); // mostrar lista para seleccionar
  };

  const handleDelete = () => {
    setModo('delete'); // mostrar lista con botones eliminar
  };

  const handleCancel = () => {
    setModo(null);
    setProductoSeleccionado(null);
    setMensaje('');
  };

  // ---------- Seleccionar producto para modificar ----------
  const seleccionarParaModificar = (prod) => {
    setProductoSeleccionado(prod);
    setFormData({
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      imagen: prod.imagen,
    });
    setModo('editForm');
  };

  // ---------- CRUD con la API ----------
  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      await productsAPI.create({
        name: formData.nombre,
        description: formData.descripcion,
        price: parseFloat(formData.precio),
        imageUrl: formData.imagen,
      });
      setMensaje('Producto creado.');
      setModo(null);
      cargarProductos();
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  const actualizarProducto = async (e) => {
    e.preventDefault();
    if (!productoSeleccionado) return;
    try {
      await productsAPI.update(productoSeleccionado.id, {
        name: formData.nombre,
        description: formData.descripcion,
        price: parseFloat(formData.precio),
        imageUrl: formData.imagen,
      });
      setMensaje('Producto actualizado.');
      setModo(null);
      setProductoSeleccionado(null);
      cargarProductos();
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await productsAPI.remove(id);
      setMensaje('Producto eliminado.');
      cargarProductos();
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  // ---------- Renderizado condicional ----------
  return (
    <div>
      {/* Mensaje de feedback */}
      {mensaje && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {mensaje}
          <button type="button" className="btn-close" onClick={() => setMensaje('')}></button>
        </div>
      )}

      {/* Menú ABM (si no estamos en modo formulario) */}
      {modo === null && (
        <ABMProducto
          onAdd={handleAdd}
          onModify={handleModify}
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}

      {/* Formulario de agregar / editar */}
      {(modo === 'add' || modo === 'editForm') && (
        <div className="card p-4 mb-4">
          <h3>{modo === 'add' ? 'Agregar Producto' : 'Modificar Producto'}</h3>
          <form onSubmit={modo === 'add' ? crearProducto : actualizarProducto}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">URL de Imagen</label>
              <input
                type="url"
                className="form-control"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-success me-2">
              {modo === 'add' ? 'Crear' : 'Guardar Cambios'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          </form>
        </div>
      )}

      {/* Lista para seleccionar qué modificar */}
      {modo === 'modify' && (
        <div className="card p-4 mb-4">
          <h3>Seleccionar producto a modificar</h3>
          <ul className="list-group">
            {productos.map((prod) => (
              <li
                key={prod.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {prod.nombre} - ${prod.precio}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => seleccionarParaModificar(prod)}
                >
                  Modificar
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary mt-3" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      )}

      {/* Lista para eliminar */}
      {modo === 'delete' && (
        <div className="card p-4 mb-4">
          <h3>Seleccionar producto a eliminar</h3>
          <ul className="list-group">
            {productos.map((prod) => (
              <li
                key={prod.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {prod.nombre} - ${prod.precio}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarProducto(prod.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary mt-3" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      )}

      {/* Catálogo (siempre visible) */}
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