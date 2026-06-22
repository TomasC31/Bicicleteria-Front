import React, { useState, useEffect } from 'react';
import CatalogoComp from '../CatalogoComp';
import ABMProducto from '../ABMProducto';
import AddProductForm from '../AddProductForm';
import ModifyProductList from '../ModifyProductList';
import DeleteProductList from '../DeleteProductList';

import { productsAPI } from '../../services/api';
import { productos as productosFalsos } from '../../Data/Productos';

/**
 * Vista de administrador conectada al Backend con control de apertura.
 */
export default function AdminView() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  
  // 1. CAMBIO AQUÍ: El estado inicial ahora es 'inicio' para que no salga el cuadro de una
  const [vistaActual, setVistaActual] = useState('inicio'); // 'inicio' | 'menu' | 'agregar' | 'modificar-lista' | 'modificar-formulario' | 'eliminar'
  const [productoAEditar, setProductoAEditar] = useState(null);

  const cargarProductos = async () => {
    try {
      const data = await productsAPI.getAll();
      const productosTraducidos = data.map((p) => ({
        id: p.id,
        nombre: p.name,
        descripcion: p.description,
        precio: p.price,
        imagen: p.imageUrl || '', // Evitamos nulls en el campo de imagen
        categoryId: p.categoryId
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

 const handleCreate = async (nuevoProducto) => {
    try {
      // 1. Limpiamos y aseguramos los datos exactos antes de tirarlos a la red
      const payload = {
        name: nuevoProducto.nombre,
        description: nuevoProducto.descripcion,
        price: Number(nuevoProducto.precio) || 0,
        imageUrl: "", //Usamos comillas vacías en vez de null
        categoryId: Number(nuevoProducto.categoriaId) || 1, //Le ponemos un "1" de respaldo por si viaja vacío
        availability: true
      };

      // 2. Imprimimos en consola para vigilar qué le estamos mandando al servidor
      console.log("Enviando al backend de Alan:", payload);

      // 3. Hacemos el fetch de tipo POST real
      await productsAPI.create(payload);
      
      setMensaje('Producto creado exitosamente en el catálogo.');
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
        availability: true
      });
      setMensaje('Producto actualizado correctamente.');
      setProductoAEditar(null);
      setVistaActual('menu');
      cargarProductos();
    } catch (error) {
      setMensaje(`Error al actualizar: ${error.message}`);
    }
  };

  const handleSeleccionarParaEditar = (producto) => {
    const mapeadoParaFormulario = {
      id: producto.id,
      nombre: producto.nombre || producto.name,
      descripcion: producto.descripcion || producto.description,
      precio: producto.precio || producto.price,
      imagen: producto.imagen || producto.imageUrl || '',
      categoriaId: producto.categoryId || '' 
    };
    
    setProductoAEditar(mapeadoParaFormulario);
    setVistaActual('modificar-formulario');
  };

  // CORRECCIÓN: Ahora cancelar te saca por completo al estado inicial limpio
  const handleCancel = () => {
    setProductoAEditar(null);
    setVistaActual('inicio'); 
    setMensaje('');
  };

  return (
    <div>
      {mensaje && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {mensaje}
          <button type="button" className="btn-close" onClick={() => setMensaje('')}></button>
        </div>
      )}

      <div className="container mt-3 text-end">
        {/* BOTÓN DETONADOR: Solo aparece si estamos en el inicio limpio */}
        {vistaActual === 'inicio' && (
          <button 
            className="btn btn-primary btn-lg" 
            onClick={() => setVistaActual('menu')}
          >
            <i className="bi bi-gear-fill me-2"></i> Gestionar Productos (ABM)
          </button>
        )}
      </div>

      {/* VISTA A: Menú Inicial del ABM con botones Agregar/Modificar/Eliminar */}
      {vistaActual === 'menu' && (
        <ABMProducto 
          onAdd={() => setVistaActual('agregar')} 
          onModify={() => setVistaActual('modificar-lista')} 
          onDelete={() => setVistaActual('eliminar')} 
          onCancel={handleCancel}
        />
      )}

      {/* VISTA B: Formulario para Agregar Nuevo */}
      {vistaActual === 'agregar' && (
        <AddProductForm 
          onSave={handleCreate} 
          onCancel={() => setVistaActual('menu')} // Volver al panel ABM
          productToEdit={null} 
        />
      )}

      {/* VISTA C: Lista de Selección para Modificar */}
      {vistaActual === 'modificar-lista' && (
        <ModifyProductList 
          items={productos} 
          onSelect={handleSeleccionarParaEditar} 
          onCancel={() => setVistaActual('menu')} 
        />
      )}

      {/* VISTA D: El Formulario cargado en modo "Modificar" */}
      {vistaActual === 'modificar-formulario' && (
        <AddProductForm 
          onSave={handleUpdate} 
          onCancel={() => setVistaActual('modificar-lista')}
          productToEdit={productoAEditar} 
        />
      )}

      {/* VISTA E: Lista para dar de Baja Directa */}
      {vistaActual === 'eliminar' && (
        <DeleteProductList 
          items={productos} 
          onDelete={handleDelete} 
          onCancel={() => setVistaActual('menu')} 
        />
      )}

      <hr />

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