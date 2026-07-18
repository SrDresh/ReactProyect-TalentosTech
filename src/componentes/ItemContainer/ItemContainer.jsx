import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from '../../context/useCart';
import './ItemContainer.css';
import { db } from '../../firebase/firebaseConfig';

function ItemListContainer({ mensaje }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart, getCantidadActual } = useCart();

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                setCargando(true);
                const productosDB = collection(db, 'productos');
                const resp = await getDocs(productosDB);
                const productosObtenidos = resp.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setProductos(productosObtenidos);
            } catch (err) {
                setError('No se pudieron cargar los productos.');
                console.error(err);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductos();
    }, []);

    if (cargando) {
        return <p className="catalogo-estado">Cargando productos, por favor espere...</p>;
    }

    if (error) {
        return <p className="catalogo-estado">{error}</p>;
    }

    const productosDestacados = productos.filter((producto) => producto.destacado === true || producto.destacado === 'true');
    const productosAMostrar = productosDestacados.length > 0 ? productosDestacados : productos;

    return (
        <section id="productos" className="catalogo">
            <h1 className="catalogo-titulo">{mensaje}</h1>

            <div className="catalogo-seccion">
                <div className="tarjeta-card">
                    {productosAMostrar.slice(0, 12).map((prod) => {
                        const cantidadActual = getCantidadActual(prod.id);
                        const sinStock = prod.stock === 0 || cantidadActual >= prod.stock;

                        return (
                            <article className="tarjeta-card_body" key={prod.id}>
                                {prod.imagen && (
                                    <img
                                        className="tarjeta-card_image"
                                        src={prod.imagen}
                                        alt={prod.nombre}
                                    />
                                )}

                                <div className="tarjeta-card_content">
                                    <h3>{prod.nombre}</h3>
                                    <p className="tarjeta-card_category">{prod.categoria || 'Sin categoría'}</p>
                                    <p className="tarjeta-card_price">${prod.precio}</p>
                                    <button
                                        className="tarjeta-card_button"
                                        type="button"
                                        onClick={() => addToCart({ ...prod }, 1)}
                                        disabled={sinStock}
                                    >
                                        {sinStock ? 'Sin stock' : 'Añadir al carrito'}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ItemListContainer;
