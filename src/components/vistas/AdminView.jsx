import React, { useState, useEffect } from 'react';

import CatalogoComp from '../CatalogoComp';

import ABMProducto from '../ABMProducto';
import AddProductForm from '../AddProductForm';
import ModifyProductList from '../ModifyProductList';
import DeleteProductList from '../DeleteProductList';

import ABMCategoria from '../Categorias/ABMCategory';
import AddCategoryForm from '../Categorias/AddCategoryForm';
import ModifyCategoryForm from '../Categorias/ModifyCategoryForm';
import DeleteCategoryForm from '../Categorias/DeleteCategoryForm';

import { categoriesAPI, productsAPI } from '../../services/api';
import { productos as productosFalsos } from '../../Data/Productos';




/**
 * Vista de administrador conectada al Backend con control de apertura.
 */

export default function AdminView() {
// Estados de productos
const [productos, setProductos] = useState([]);
const [mensaje, setMensaje] = useState('');
const [vistaActual, setVistaActual] = useState('inicio');
const [productoAEditar, setProductoAEditar] = useState(null);

// Estados de categorías
const [categorias, setCategorias] = useState([]);
const [vistaActualCat, setVistaActualCat] = useState('inicio');
const [categoriaAEditar, setCategoriaAEditar] = useState(null);

// ---------- Carga de datos ----------
const cargarProductos = async () => {
  try {
    const data = await productsAPI.getAll();
    const productosTraducidos = data.map((p) => ({
      id: p.id,
      nombre: p.name,
      descripcion: p.description,
      precio: p.price,
      imagen: p.imageUrl || '',
      categoryId: p.categoryId,
    }));
    setProductos(productosTraducidos);
  } catch (error) {
    console.error('Error al cargar productos:', error);
    setProductos(productosFalsos);
    setMensaje('No se pudieron cargar los productos. Usando datos locales.');
  }
};

const cargarCategorias = async () => {
  try {
    const cats = await categoriesAPI.getAll();
    setCategorias(cats);
  } catch (error) {
    console.error('Error al cargar categorías:', error);
    setCategorias([]);
    setMensaje('No se pudieron cargar las categorías.');
  }
};

useEffect(() => {
  cargarProductos();
  cargarCategorias();
}, []);

// ---------- Handlers de productos ----------
const handleCreate = async (nuevoProducto) => {
  try {
    const payload = {
      name: nuevoProducto.nombre,
      description: nuevoProducto.descripcion,
      price: Number(nuevoProducto.precio) || 0,
      imageUrl: "",
      categoryId: Number(nuevoProducto.categoriaId) || 1,
      availability: true,
    };
    console.log("Enviando al backend:", payload);
    await productsAPI.create(payload);
    setMensaje('Producto creado exitosamente.');
    setVistaActual('menu');
    cargarProductos();
  } catch (error) {
    setMensaje(`Error al crear producto: ${error.message}`);
    console.error("Fallo del servidor:", error);
  }
};

const handleUpdate = async (productoModificado) => {
  try {
    await productsAPI.update(productoModificado.id, {
      name: productoModificado.nombre,
      description: productoModificado.descripcion,
      price: productoModificado.precio,
      imageUrl: "",
      categoryId: productoModificado.categoriaId,
      availability: true,
    });
    setMensaje('Producto actualizado correctamente.');
    setProductoAEditar(null);
    setVistaActual('menu');
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

const handleSeleccionarParaEditar = (producto) => {
  const mapeado = {
    id: producto.id,
    nombre: producto.nombre || producto.name,
    descripcion: producto.descripcion || producto.description,
    precio: producto.precio || producto.price,
    imagen: producto.imagen || producto.imageUrl || '',
    categoriaId: producto.categoryId || '',
  };
  setProductoAEditar(mapeado);
  setVistaActual('modificar-formulario');
};

const handleCancel = () => {
  setProductoAEditar(null);
  setVistaActual('inicio');
  setMensaje('');
};

// ---------- Handlers de categorías ----------
const handleCreateCategory = async (datos) => {
  try {
    await categoriesAPI.create(datos);   // <-- corregido (antes enviaba { datos })
    setMensaje('Categoría creada');
    setVistaActualCat('menu');
    cargarCategorias();
  } catch (error) {
    setMensaje(`Error: ${error.message}`);
  }
};

const handleUpdateCategoria = async (id, datos) => {
  try {
    await categoriesAPI.update(id, datos);
    setMensaje('Categoría actualizada');
    setVistaActualCat('menu');
    cargarCategorias();
  } catch (error) {
    setMensaje(`Error: ${error.message}`);
  }
};

const handleDeleteCategoria = async (id) => {
  if (!window.confirm('¿Eliminar esta categoría?')) return;
  try {
    await categoriesAPI.remove(id);
    setMensaje('Categoría eliminada');
    cargarCategorias();
  } catch (error) {
    setMensaje(`Error: ${error.message}`);
  }
};

const handleSeleccionarCategoriaParaEditar = (categoria) => {
  setCategoriaAEditar(categoria);
  setVistaActualCat('modificar-formulario');
};

const handleCancelCategorias = () => {
  setCategoriaAEditar(null);
  setVistaActualCat('inicio');
};



return (
  <div>
    {mensaje && (
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        {mensaje}
        <button type="button" className="btn-close" onClick={() => setMensaje('')}></button>
      </div>
    )}

    {/* ==================== ABM PRODUCTOS ==================== */}
    <div className="container mt-3 text-end">
      {vistaActual === 'inicio' && (
        <button 
          className="btn btn-primary btn-lg" 
          onClick={() => setVistaActual('menu')}
        >
          <i className="bi bi-gear-fill me-2"></i> Gestionar Productos (ABM)
        </button>
      )}
    </div>

    {vistaActual === 'menu' && (
      <ABMProducto 
        onAdd={() => setVistaActual('agregar')} 
        onModify={() => setVistaActual('modificar-lista')} 
        onDelete={() => setVistaActual('eliminar')} 
        onCancel={handleCancel}
      />
    )}

    {vistaActual === 'agregar' && (
      <AddProductForm 
        onSave={handleCreate} 
        onCancel={() => setVistaActual('menu')}
        productToEdit={null} 
      />
    )}

    {vistaActual === 'modificar-lista' && (
      <ModifyProductList 
        items={productos} 
        onSelect={handleSeleccionarParaEditar} 
        onCancel={() => setVistaActual('menu')} 
      />
    )}

    {vistaActual === 'modificar-formulario' && (
      <AddProductForm 
        onSave={handleUpdate} 
        onCancel={() => setVistaActual('modificar-lista')}
        productToEdit={productoAEditar} 
      />
    )}

    {vistaActual === 'eliminar' && (
      <DeleteProductList 
        items={productos} 
        onDelete={handleDelete} 
        onCancel={() => setVistaActual('menu')} 
      />
    )}

    <hr />

    {/* ==================== ABM CATEGORÍAS ==================== */}
    <div className="container mt-3 text-end">
      {vistaActualCat === 'inicio' && (
        <button 
          className="btn btn-primary btn-lg" 
          onClick={() => setVistaActualCat('menu')}
        >
          <i className="bi bi-tags-fill me-2"></i> Gestionar Categorías (ABM)
        </button>
      )}
    </div>

    {vistaActualCat === 'menu' && (
      <ABMCategoria 
        onAdd={() => setVistaActualCat('agregar')}
        onModify={() => setVistaActualCat('modificar-lista')}
        onDelete={() => setVistaActualCat('eliminar')}
        onCancel={handleCancelCategorias}
      />
    )}

    {vistaActualCat === 'agregar' && (
      <AddCategoryForm 
        onSave={handleCreateCategory}
        onCancel={() => setVistaActualCat('menu')}
        categoryToEdit={null}
      />
    )}

    {vistaActualCat === 'modificar-lista' && (
      <ModifyCategoryForm 
        items={categorias} 
        onSelect={handleSeleccionarCategoriaParaEditar}
        onCancel={() => setVistaActualCat('menu')}
      />
    )}

    {vistaActualCat === 'modificar-formulario' && (
      <AddCategoryForm 
        onSave={handleUpdateCategoria}
        onCancel={() => setVistaActualCat('modificar-lista')}
        categoryToEdit={categoriaAEditar}
      />
    )}

    {vistaActualCat === 'eliminar' && (
      <DeleteCategoryForm
        items={categorias} 
        onDelete={handleDeleteCategoria}
        onCancel={() => setVistaActualCat('menu')}
      />
    )}

    <hr />

    {/* Catálogo */}
    <div className="container mt-4">
      <h1 className="mb-4">Anuncios</h1>
      <CatalogoComp items={productos} type="simple" />
    </div>
    <div className="container mt-4">
      <h1 className="mb-4">Bicicletas</h1>
      <CatalogoComp items={productos} type="multi" />
    </div>
  </div>
);
}