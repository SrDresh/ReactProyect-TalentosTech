import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './GestionCupones.css';

const estadoInicial = {
    codigo: '',
    descuento: '',
};

const GestionCupones = () => {
    const [datosForm, setDatosForm] = useState(estadoInicial);
    const [cupones, setCupones] = useState([]);
    const [cuponAEditar, setCuponAEditar] = useState(null);

    const obtenerCupones = async () => {
        const respuesta = await getDocs(collection(db, 'Cupones'));
        const lista = respuesta.docs.map((item) => ({
            id: item.id,
            ...item.data(),
        }));
        setCupones(lista);
    };

    useEffect(() => {
        obtenerCupones();
    }, []);

    const manejarCambio = (e) => {
        setDatosForm({
            ...datosForm,
            [e.target.name]: e.target.value,
        });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (!datosForm.codigo || !datosForm.descuento) {
            alert('Complete todos los campos');
            return;
        }

        const payload = {
            codigo: datosForm.codigo.trim(),
            descuento: Number(datosForm.descuento),
        };

        if (cuponAEditar) {
            await updateDoc(doc(db, 'Cupones', cuponAEditar.id), payload);
        } else {
            await addDoc(collection(db, 'Cupones'), payload);
        }

        setDatosForm(estadoInicial);
        setCuponAEditar(null);
        await obtenerCupones();
    };

    const editarCupon = (cupon) => {
        setCuponAEditar(cupon);
        setDatosForm({
            codigo: cupon.codigo,
            descuento: cupon.descuento,
        });
    };

    const eliminarCupon = async (id) => {
        const confirmar = window.confirm('¿Desea eliminar este cupón?');
        if (!confirmar) return;

        await deleteDoc(doc(db, 'Cupones', id));

        if (cuponAEditar?.id === id) {
            setCuponAEditar(null);
            setDatosForm(estadoInicial);
        }

        await obtenerCupones();
    };

    const cancelarEdicion = () => {
        setCuponAEditar(null);
        setDatosForm(estadoInicial);
    };

    return (
        <div className="gestion-cupones">
            <section className="gestion-cupones__panel">
                <div className="gestion-cupones__header">
                    <div>
                        <p className="gestion-cupones__eyebrow">Panel de gestión</p>
                        <h2 className="gestion-cupones__title">{cuponAEditar ? 'Editar cupón' : 'Agregar cupón'}</h2>
                    </div>
                    {cuponAEditar && (
                        <button type="button" onClick={cancelarEdicion} className="gestion-cupones__cancel-btn">
                            Cancelar edición
                        </button>
                    )}
                </div>

                <form onSubmit={manejarEnvio} className="gestion-cupones__form">
                    <div className="gestion-cupones__grid">
                        <input
                            type="text"
                            name="codigo"
                            placeholder="Código"
                            value={datosForm.codigo}
                            onChange={manejarCambio}
                            className="gestion-cupones__input"
                            required
                        />
                        <input
                            type="number"
                            name="descuento"
                            placeholder="Descuento"
                            value={datosForm.descuento}
                            onChange={manejarCambio}
                            className="gestion-cupones__input"
                            min="1"
                            max="100"
                            required
                        />
                    </div>

                    <div className="gestion-cupones__actions">
                        <button type="submit" className="gestion-cupones__submit-btn">
                            {cuponAEditar ? 'Actualizar cupón' : 'Crear cupón'}
                        </button>
                    </div>
                </form>
            </section>

            <section className="gestion-cupones__list-panel">
                <h3 className="gestion-cupones__list-title">Cupones en Firestore</h3>
                <ul className="gestion-cupones__list">
                    {cupones.length === 0 ? (
                        <li className="gestion-cupones__empty">No hay cupones cargados todavía.</li>
                    ) : (
                        cupones.map((cupon) => (
                            <li key={cupon.id} className="gestion-cupones__item">
                                <div className="gestion-cupones__item-info">
                                    <strong className="gestion-cupones__item-name">{cupon.codigo}</strong>
                                    <div className="gestion-cupones__item-meta">Descuento: {cupon.descuento}%</div>
                                </div>
                                <div className="gestion-cupones__item-actions">
                                    <button type="button" onClick={() => editarCupon(cupon)} className="gestion-cupones__edit-btn">
                                        Editar
                                    </button>
                                    <button type="button" onClick={() => eliminarCupon(cupon.id)} className="gestion-cupones__delete-btn">
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

export default GestionCupones;