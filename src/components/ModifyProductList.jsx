import React from 'react';

const ModifyProductList = ({ items, onSelect, onCancel }) => {
  return (
    <div className="container mt-3 p-4 border rounded bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Seleccioná el producto a Modificar</h3>
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>
          Volver al Panel
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-muted">No hay productos disponibles para modificar.</p>
      ) : (
        <div className="list-group">
          {items.map((producto) => {
            const imagenSrc =
              producto.imagen ||
              producto.imagenDir ||
              producto.imageUrl ||
              'https://placehold.co/60x60?text=Sin+imagen';

            return (
              <div
                key={producto.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={imagenSrc}
                    alt={producto.nombre || 'Producto'}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      border: '1px solid #dee2e6',
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      // placeholder del mismo tamaño que la miniatura
                      e.target.src = 'https://placehold.co/60x60?text=Sin+imagen';
                    }}
                  />
                  <div>
                    <strong>{producto.nombre}</strong> — ${producto.precio}
                    <br />
                    <small className="text-muted">{producto.descripcion}</small>
                  </div>
                </div>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => onSelect(producto)}
                >
                  Editar Campos
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ModifyProductList;