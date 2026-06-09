import React, { useState } from 'react';
import ABMProducto from '../components/ABMProducto';
import AddProductForm from '../components/AddProductForm';
import ModifyProductForm from '../components/ModifyProductForm';
import DeleteProductForm from '../components/DeleteProductForm';
import CatalogoComp from '../components/CatalogoComp';
import { productos } from '../Data/Productos';


// Componente de la página de inicio, muestra el catálogo de productos con diferentes tipos de carruseles
export default function HomePag() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-4">Anuncios</h1>
        <CatalogoComp items={productos} type="simple" />
      </div>

      <div className='home-page'>
        <div className="container mt-4">
          <h1 className="mb-4">Bicicletas </h1>
          <CatalogoComp items={productos} type="multi" />
        </div>

        <div className="container mt-4">
          <h1 className="mb-4">Partes</h1>
          <CatalogoComp items={productos} type="multi" />
        </div>
      </div>
    </div>
  );
}
