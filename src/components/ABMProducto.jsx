import React from 'react';
import './ABMProducto.css';


//Cuando aprieto el boton de gestionar los productos, se abre esto para preguntarme que es lo que quiero hacer.
//Despues de elegir, paso a add, delete o modify, dependiendo lo que elegí.

const ABMProducto = ({ onAdd, onModify, onDelete, onCancel }) => {
  return (
    <div className="abm-producto-container">
      <div className="abm-producto-menu">
        <h2>Gestionar Productos</h2>
        <div className="abm-actions">
          <button onClick={onAdd}>Agregar Producto</button>
          <button onClick={onModify}>Modificar Producto</button>
          <button onClick={onDelete}>Eliminar Producto</button>
        </div>
        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default ABMProducto;
