import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { CartProvider } from './componentes/Carrito/CartContext.jsx';
import { AuthProvider } from './componentes/Login/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
