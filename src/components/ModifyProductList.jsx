import React from 'react';
import './ModifyProductList.css';

{/* El modify se habla con addProduct por medio del Homepag*/}
{/* Componente que muestra la lista de productos para elegir cual modificar, cuando elijo uno, se llama a onSelect con el producto elegido, y onCancel para cerrar la lista sin elegir nada. */}

const ModifyProductList = ({ items, onSelect, onCancel }) => {
  return (
    <div className="modify-product-container">
      <div className="modify-product-list">
        <h2>Modificar Producto</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.nombre}</span>

              {/* Cuando elijo un producto para modificar, voy al addProductForm pero con la info del producto que elegí, para poder modificarlo. */}
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

{/* Cuando aprieto en el boton de modificar, el producto se guarda en HomePag en una variable que se llama productoAEditar, el paso 3 es que AddProduct recibe los datos y dibuja lo que le pasaron*/}
