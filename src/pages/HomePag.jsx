import CatalogoComp from '../components/CatalogoComp';
import { productos } from '../Data/Productos';

export default function HomePag() {
  return (
    <div className='home-page'>

      <div className="container mt-4">
        <h1  className="mb-4">Biciletas</h1>
        <CatalogoComp items={productos} />
      </div>

      <div className="container mt-4">
        <h1  className="mb-4">Anuncios</h1>
        <CatalogoComp items={productos} />
      </div>

      <div className="container mt-4">
        <h1  className="mb-4">Cascos</h1>
        <CatalogoComp items={productos} />
      </div>
    </div>


  );
}
