import MultiItemCarousel from './carousels/MultiItemCarousel';
import SimpleCarousel from './carousels/SimpleCarousel';
import GridLayout from './carousels/GridLayout';

// Componente orquestador que elige qué tipo de carrusel mostrar
// type: 'simple' | 'multi' | 'grid'
const CatalogoComp = ({ items, type = 'multi' }) => {
  const safeItems = (items || []).filter(Boolean);

  if (!safeItems.length) return null;

  switch (type) {
    case 'simple':
      return <SimpleCarousel items={safeItems} />;
    case 'multi':
      return <MultiItemCarousel items={safeItems} />;
    case 'grid':
      return <GridLayout items={safeItems} />;
    default:
      return <MultiItemCarousel items={safeItems} />;
  }
};

export default CatalogoComp;
