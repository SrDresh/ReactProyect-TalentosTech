import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./useCart";

const formatPrice = (value) =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(value);

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cart, clearCart, removeFromCart, getCartQuantity, getCartTotal } = useCart();
    const cartQuantity = getCartQuantity();

    return (
        <div className="cart-widget">
            <button
                className="nav__cart"
                type="button"
                aria-label="Abrir carrito de compras"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
            >
                <svg className="nav__cart-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2ZM7.16 14.26c-.75 0-1.41-.41-1.75-1.03L2 3H0V1h3.31l.94 2H21c.75 0 1.2.82.82 1.47l-3.58 6.49a2 2 0 0 1-1.75 1.04H8.1l-.9 1.63H19v2H7.16ZM5.2 5l2.4 5h8.9l2.76-5H5.2Z" />
                </svg>
                <span>Carrito</span>
                <span className="nav__cart-count">{cartQuantity}</span>
            </button>

            {isOpen && (
                <div className="cart-dropdown">
                    <div className="cart-dropdown__header">
                        <strong>Carrito de compras</strong>
                        <span>{cartQuantity} item(s)</span>
                    </div>

                    {cart.length === 0 ? (
                        <p className="cart-dropdown__empty">El carrito esta vacio.</p>
                    ) : (
                        <>
                            <div className="cart-dropdown__items">
                                {cart.map((item) => (
                                    <article className="cart-dropdown__item" key={item.id}>
                                        {item.imagen && (
                                            <img src={item.imagen} alt={item.nombre} />
                                        )}
                                        <div>
                                            <h4>{item.nombre}</h4>
                                            <p>Cantidad: {item.cantidad}</p>
                                            <p>{formatPrice(item.precio * item.cantidad)}</p>
                                            <button
                                                className="cart-dropdown__remove"
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="cart-dropdown__footer">
                                <strong>Total: {formatPrice(getCartTotal())}</strong>
                                <div className="cart-dropdown__actions">
                                    <button type="button" onClick={clearCart}>
                                        Vaciar
                                    </button>
                                    <Link
                                        to="/"
                                        onClick={() => {
                                            alert("Gracias por comprar");
                                            clearCart();
                                            setIsOpen(false);
                                        }}
                                    >
                                        Finalizar
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
