import { Link } from 'react-router-dom'
import './Nav.css'

const enlaces = ['Inicio', 'Categorias','Solicitud de Producto', 'Contacto']

function Nav() {
  return (
    <nav className="nav">
      <div className="nav__content">
        <Link className="nav_position" to="/">
          Dresh Tech
        </Link>

        <div className="nav__links">
          <Link to="/">Inicio</Link>
          <a href="#categorias">Categorias</a>
          <Link to="/solicitud-producto">Solicitud de Producto</Link>
          <a href="#contacto">Contacto</a>
        </div>

        <button className="nav__cart" type="button">
          Carrito (0)
        </button>
      </div>
    </nav>
  )
}

export default Nav