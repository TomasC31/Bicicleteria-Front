import CatalogoComp from '../components/CatalogoComp';

import { productos } from '../Data/Productos';


// Componente de la página de inicio, muestra el catálogo de productos con diferentes tipos de carruseles
export default function HomePag() {
  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-4">Simple Carrusel</h1>
        <CatalogoComp items={productos} type="simple" />
      </div>

      <div className='home-page'>
        <div className="container mt-4">
          <h1 className="mb-4">Render Carousel 1</h1>
          <CatalogoComp items={productos} type="multi" />
        </div>

        <div className="container mt-4">
          <h1 className="mb-4">Render Carousel 2</h1>
          <CatalogoComp items={productos} type="multi" />
        </div>
      </div>
    </div>
  );
}
