import React from 'react';
import './ModifyProductList.css';

const ModifyProductList = ({ items, onSelect, onCancel }) => {
  return (
    <div className="modify-product-container">
      <div className="modify-product-list">
        <h2>Modificar Producto</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.nombre}</span>
              <button onClick={() => onSelect(item)}>Modificar</button>
            </li>
          ))}
        </ul>
        <button className="cancel-button" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModifyProductList;
