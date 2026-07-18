import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'
import "./productosBD.css"



const productosBD = () => {
    // Estado para guardar los productos que traigamos de la DB
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const productosDB = collection(db, "productos")
        getDocs(productosDB).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                })
            );
        })
    }, []);
    return (
        <div className="tarjeta-card">
            {productos.map((prod) => (
                <div className="tarjeta-card_body" key={prod.id}>

                    <img
                        className="tarjeta-card_image"
                        src={prod.imagen}
                        alt={prod.nombre}
                    />

                    <h3>{prod.nombre}</h3>

                    <p className="tarjeta-card_category">
                        {prod.categoria}
                    </p>

                    <p className="tarjeta-card_price">
                        ${prod.precio}
                    </p>

                    <p className="tarjeta-card_stock">
                        Stock: {prod.stock}
                    </p>

                </div>
            ))}
        </div>
    )
}

export default productosBD;