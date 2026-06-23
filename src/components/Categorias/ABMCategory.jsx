import React from 'react';
import '../ABMProducto.css'; // Podés reutilizar los mismos estilos

const ABMCategoria = ({ onAdd, onModify, onDelete, onCancel }) => {
  return (
    <div className="abm-producto-container">
      <div className="abm-producto-menu">
        <h2>Gestionar Categorías</h2>
        <div className="abm-actions">
          <button onClick={onAdd}>Agregar Categoría</button>
          <button onClick={onModify}>Modificar Categoría</button>
          <button onClick={onDelete}>Eliminar Categoría</button>
        </div>
        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default ABMCategoria;