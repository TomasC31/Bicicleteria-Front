import React from 'react';

const DeleteCategoryForm = ({ items, onDelete, onCancel }) => {
  return (
    <div className="abm-producto-container">
      <div className="abm-producto-menu">
        <h3>Eliminar Categoría</h3>
        {items.length === 0 ? (
          <p>No hay categorías.</p>
        ) : (
          <ul className="list-group">
            {items.map(cat => (
              <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{cat.name || 'Sin nombre'}</strong>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    const nombreMostrado = cat.name || 'esta categoría';
                    if (window.confirm(`¿Eliminar "${nombreMostrado}"?`)) {
                      onDelete(cat.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
        <button className="btn btn-secondary mt-3" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteCategoryForm;