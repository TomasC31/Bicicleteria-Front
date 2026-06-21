import React from 'react';
import NormalView from '../components/vistas/NormalView';
import AdminView from '../components/vistas/AdminView';
import { useAuth } from '../Context/AuthContext';

/**
 * Página principal.
 * Decide qué vista mostrar según el rol del usuario autenticado.
 */
export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  // Si está autenticado y es admin, mostrar AdminView
  if (isAuthenticated && user?.rol === 'Admin') {
    return <AdminView />;
  }

  // En cualquier otro caso (no autenticado o rol distinto), vista normal
  return <NormalView />;
}