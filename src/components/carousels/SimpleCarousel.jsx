import './SimpleCarousel.css';
import { useAuth } from '../../Context/AuthContext';

// Carrusel simple sin librerías externas - Usa CSS Scroll Snap
// Muestra 1 item a la vez ocupando el 100% del ancho con scroll horizontal nativo
const SimpleCarousel = ({ items }) => {

  const { user, token } = useAuth();

  // Filtramos items nulos para evitar errores de renderizado
  const safeItems = (items || []).filter(Boolean);

  //Esta funcion se ejecuta cuando el admin hace click en agregar un producto
  const handleAgregarProducto = async () => {
    alert("Aca se va a abrir el formulario para agregar el nuevo producto")
    //CUANDO TENGAMOS EL BACKEND, ACA VAMOS A ABRIR UN FORMULARIO PARA AGREGAR UN NUEVO PRODUCTO, SOLO SI EL USUARIO ESTA LOGEADO Y TIENE EL ROL DE ADMINISTRADOR, SI NO ESTA LOGEADO O NO TIENE EL ROL DE ADMINISTRADOR, MOSTRAMOS UN MENSAJE DE ERROR O UNA ALERTA QUE DIGA QUE NO TIENE PERMISO PARA AGREGAR UN NUEVO PRODUCTO
  }

  return (
    <div className="simple-carousel-wrapper">

      {/*ESTE BOTON ES SOLO PARA LOS ADMINS*/}
      {user && user.tipo === 'admin' && (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <button onClick={handleAgregarProducto} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Agregar Producto</button>
        </div>
      )}

      {/* Si no hay datos para mostrar,muestro un texto pero NO oculto el boton del admin*/}
      {!safeItems.length ? (
        <p style={{ textAlign: 'center' }}> No hay productos disponibles en este momento</p>
      ) : (
        <>
          {/*Contenedor del carrousel con CSS Scroll Snap*/}
          <div className="simple-carousel-container">

            {/* Mapeo cada item y lo renderizo en un slide */}
            {safeItems.map((item) => (
              <div key={item.id} className="simple-carousel-slide">

                {/* Card personalizada sin React Bootstrap */}
                <div className="simple-carousel-card">
                  
                  {/* Imagen del producto */}
                  {item.imagen && (
                    <div className="simple-carousel-image-wrapper">
                      <img src={item.imagen} className="simple-carousel-image" alt="Producto" />
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

          {/* Indicador visual del número de slides*/}
          <div className="simple-carousel-indicators">
            {safeItems.map((_, index) => (
              <div key={index} className="simple-carousel-dot" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleCarousel;