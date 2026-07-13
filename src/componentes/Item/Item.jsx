import { useCart } from '../Carrito/useCart';
import './Item.css';

function Item({ id, nombre, precio, stock, categoria, marca, imagen }) {
    const { addToCart, getCantidadActual } = useCart();
    const cantidadActual = getCantidadActual(id);
    const sinStock = stock === 0 || cantidadActual >= stock;

    const CompraClick = () => {
        addToCart({ id, nombre, precio, stock, categoria, marca, imagen }, 1);
    }

    return (
        <article className="item-card"> {imagen && (
        <img className="item-card_image" src={imagen} alt={nombre} width="150" height="150" /> 
        )}
            <div className="item-card_body">
                <h3>{nombre}</h3>
                <p className='item-card_marca'>Marca: {marca}</p>
                <p className='item-card_category'>Categoria: {categoria}</p>
                <p className='item-card_price'>Precio: ${precio}</p>
                <p>Stock disponible: {stock}</p>
                <button className='item-card_button' onClick={CompraClick} disabled={sinStock}>
                    {sinStock ? 'Sin stock' : 'Anadir al carrito'}
                </button>
            </div>
        </article>
    )
};

export default Item;
