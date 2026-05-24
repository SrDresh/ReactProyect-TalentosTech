import { Links } from 'react-router-dom'
import './Nav.css'

const enlaces = ['Inicio', 'Categorias','Solicitud de Producto', 'Contacto']

function Nav() {
  return (
    <nav className="nav">
      <div className="nav__content">
        <a className="nav_position" href="#top">
          Dresh Tech
        </a>
        <div className="nav__links">
          {enlaces.map((enlace) => (
            <a key={enlace} href={`#${enlace.toLowerCase().replaceAll(' ', '-')}`}>
              {enlace}
            </a>
          ))}
        </div>

        <button className="nav__cart" type="button">
          Carrito (0)
        </button>
      </div>
    </nav>
  )
}

export default Nav