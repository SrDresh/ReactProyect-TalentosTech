import { useState } from "react";
import { CartContext } from "./useCart";

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, cantidad = 1) => {
        setCart((prevCart) => {
            const itemEnCarrito = prevCart.find((item) => item.id === product.id);

            if (itemEnCarrito) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, cantidad: Math.min(item.cantidad + cantidad, item.stock) }
                        : item
                );
            }

            return [...prevCart, { ...product, cantidad }];
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const getCartQuantity = () => {
        return cart.reduce((total, item) => total + item.cantidad, 0);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
    };

    const getCantidadActual = (productId) => {
        const item = cart.find((item) => item.id === productId);
        return item ? item.cantidad : 0;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                getCartQuantity,
                getCartTotal,
                getCantidadActual,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
