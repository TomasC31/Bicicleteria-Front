import React from 'react';

const ModifyCategoryForm = ({ items, onSelect, onCancel }) => {
  return (
    <div className="abm-producto-container">
      <div className="abm-producto-menu">
        <h3>Seleccionar categoría a modificar</h3>
        {items.length === 0 ? (
          <p>No hay categorías.</p>
        ) : (
          <ul className="list-group">
            {items.map(cat => (
              <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center">
                {cat.nombre}
                <button className="btn btn-sm btn-primary" onClick={() => onSelect(cat)}>
                  Modificar
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

export default ModifyCategoryForm;