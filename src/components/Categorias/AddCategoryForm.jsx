import React, { useState, useEffect } from 'react';

const AddCategoryForm = ({ onSave, onCancel, categoryToEdit }) => {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (categoryToEdit) {
      setNombre(categoryToEdit.nombre || '');
    } else {
      setNombre('');
    }
  }, [categoryToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    if (categoryToEdit) {
      onSave(categoryToEdit.id, { nombre: nombre.trim() });
    } else {
      onSave({ nombre: nombre.trim() });
    }
  };

  return (
    <div className="abm-producto-container">
      <div className="abm-producto-menu">
        <h3>{categoryToEdit ? 'Modificar Categoría' : 'Agregar Categoría'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success me-2">
            {categoryToEdit ? 'Guardar cambios' : 'Crear'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;