// src/data/productos.js
export const productos = [
  {
    id: 1,
    nombre: 'Bicicleta de montaña MTB',
    descripcion: 'Bicicleta de montaña de alta calidad',
    precio: 1650000,
    imagen: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: 2,
    nombre: 'Bicicleta de ruta',
    descripcion: 'Bicicleta diseñada para el uso en carretera',
    precio: 1500000,
    imagen: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: 3,
    nombre: 'Bicicleta eléctrica',
    descripcion: 'Bicicleta con motor eléctrico',
    precio: 1990000,
    imagen: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: 5,
    nombre: 'Cuadro de bicicleta',
    descripcion: 'Cuadro de aluminio de alta calidad',
    precio: 290000,
    imagen: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: 6,
    nombre: 'Piñon de bicicleta',
    descripcion: 'Piñon de alta calidad para bicicleta',
    precio: 45000,
    imagen: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&h=300&q=80'
  }
];


// Función para inicializar los productos en localStorage si no existen
export const inicializarProductos = () => {
  if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(productos));
  }
};