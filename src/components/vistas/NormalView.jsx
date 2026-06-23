import React, { useState } from 'react';
import { useEffect } from 'react';
import CatalogoComp from '../CatalogoComp';


// Componente de la página de inicio, muestra el catálogo de productos con diferentes tipos de carruseles
export default function HomePag() {
  const [showAddForm, setShowAddForm] = useState(false);

  //Creo un estado para guardar los productos que lleguen del back
  const [productos, setListaProductos] = useState([]);

  //UseEffect se ejecuta autmoaticamente cuando se abre la pagina
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/Products`); // Reemplaza con tu URL real
        if(!response.ok) {
          throw new Error('Error al conectar con el backend');
        }

        const datosBackend = await response.json();


        //Acá voy a hacer la traduccion de ingles a español, ya que hicimos el back en ingles y el front en español.
        //Cuando supimos que se podia hacer la traduccion en vez de pasar todo a ingles, decidimos hacerlo para probar algo nuevo

        const productosTraducidos = datosBackend.map(producto => ({
          id: producto.id,
          nombre: producto.name,
          descripcion: producto.description,
          precio: producto.price,
          imagen: producto.imageUrl,
        }));

        //Guardo los productos traducidos en el estado para que se muestren en el catalogo
        setListaProductos(productosTraducidos);

      } catch (error) {
        console.error('Error al cargar los productos:', error);
        
      //Si hay un error, muestro vacio.
        setListaProductos([]);
      }
    };

    cargarProductos();
  }, []); // El array vacío hace que se ejecute una sola vez al entrar a la pagina.

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
