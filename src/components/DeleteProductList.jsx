import React from 'react';
import './DeleteProductList.css';

const DeleteProductList = ({ items, onDelete, onCancel }) => {
  return (
    <div className="delete-product-container">
      <div className="delete-product-list">
        <h2>Eliminar Producto</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.nombre}</span>
              <button onClick={() => onDelete(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteProductList;
