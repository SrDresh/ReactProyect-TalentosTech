import React from 'react';
import './FormularioProducto.css';

const FormularioProducto = ({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  loading,
  productos,
  handleDelete,
  handleEdit,
  productoAEditar,
  cancelarEdicion,
}) => {
  return (
    <div className="gestion-productos">
      <section className="gestion-productos__panel">
        <div className="gestion-productos__header">
          <div>
            <p className="gestion-productos__eyebrow">Panel de gestión</p>
            <h2 className="gestion-productos__title">
              {productoAEditar ? 'Editar producto' : 'Agregar producto'}
            </h2>
          </div>
          {productoAEditar && (
            <button type="button" onClick={cancelarEdicion} className="gestion-productos__cancel-btn">
              Cancelar edición
            </button>
          )}
        </div>

        <form onSubmit={manejarEnvio} className="gestion-productos__form">
          <div className="gestion-productos__grid">
            <input name="nombre" value={datosForm.nombre || ''} onChange={manejarCambio} placeholder="Nombre del producto" required className="gestion-productos__input" />
            <input name="categoria" value={datosForm.categoria || ''} onChange={manejarCambio} placeholder="Categoría" className="gestion-productos__input" />
          </div>

          <div className="gestion-productos__grid">
            <input name="precio" type="number" min="0" value={datosForm.precio || ''} onChange={manejarCambio} placeholder="Precio" required className="gestion-productos__input" />
            <input name="stock" type="number" min="0" value={datosForm.stock || ''} onChange={manejarCambio} placeholder="Stock" required className="gestion-productos__input" />
          </div>

          <textarea name="descripcion" value={datosForm.descripcion || ''} onChange={manejarCambio} placeholder="Descripción" rows="4" className="gestion-productos__textarea" />

          <label className="gestion-productos__label">
            Imagen del producto
            <input type="file" accept="image/*" onChange={manejarCambioImagen} className="gestion-productos__file" />
          </label>

          <div className="gestion-productos__actions">
            <button type="submit" disabled={loading} className="gestion-productos__submit-btn">
              {loading ? 'Guardando...' : productoAEditar ? 'Actualizar producto' : 'Agregar producto'}
            </button>
          </div>
        </form>
      </section>

      <section className="gestion-productos__list-panel">
        <h3 className="gestion-productos__list-title">Productos en Firestore</h3>
        <ul className="gestion-productos__list">
          {productos.length === 0 ? (
            <li className="gestion-productos__empty">No hay productos cargados todavía.</li>
          ) : (
            productos.map((producto) => (
              <li key={producto.id} className="gestion-productos__item">
                <div className="gestion-productos__item-info">
                  <strong className="gestion-productos__item-name">{producto.nombre}</strong>
                  <div className="gestion-productos__item-meta">Precio: ${Number(producto.precio || 0).toLocaleString('es-AR')}</div>
                  <div className="gestion-productos__item-meta">Stock: {producto.stock}</div>
                  <div className="gestion-productos__item-meta">Categoría: {producto.categoria || 'Sin categoría'}</div>
                </div>
                <div className="gestion-productos__item-actions">
                  <button type="button" onClick={() => handleEdit(producto)} className="gestion-productos__edit-btn">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(producto.id)} className="gestion-productos__delete-btn">
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default FormularioProducto;