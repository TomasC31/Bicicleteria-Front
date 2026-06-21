import React from 'react';

const ModifyProductList = ({ items, onSelect, onCancel }) => {
  return (
    <div className="container mt-3 p-4 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Seleccioná el producto a Modificar</h3>
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>Volver al Panel</button>
      </div>

      {items.length === 0 ? (
        <p className="text-muted">No hay productos disponibles para modificar.</p>
      ) : (
        <div className="list-group">
          {items.map((producto) => (
            <div 
              key={producto.id} 
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{producto.nombre}</strong> — ${producto.precio}
                <br />
                <small className="text-muted">{producto.descripcion}</small>
              </div>
              <button 
                className="btn btn-warning btn-sm" 
                onClick={() => onSelect(producto)}
              >
                Editar Campos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModifyProductList;