import { Link } from 'react-router-dom'
import Cart from '../../Carrito/Cart'
import { useAuth } from '../../Login/useAuth'
import './Nav.css'

const categorias = [
  { nombre: 'Motherboards', path: '/?categoria=Motherboards' },
  { nombre: 'Procesadores', path: '/?categoria=Procesadores' },
  { nombre: 'Fuentes', path: '/?categoria=Fuentes' },
  { nombre: 'Monitores', path: '/?categoria=Monitores' },
  { nombre: 'Placas de video', path: '/?categoria=Placas_de_video'}
]

function Nav() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <nav className="nav">
      <div className="nav__content">
        <Link className="nav_position" to="/">
          Dresh Tech
        </Link>

        <div className="nav__links">
          <Link to="/">Inicio</Link>

          <div className="nav__dropdown">
            <button className="nav__dropdown-button" type="button">
              Categorias
            </button>

            <div className="nav__dropdown-menu">

              {categorias.map((categoria) => (
                <Link key={categoria.nombre} to={categoria.path}>
                  {categoria.nombre}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/panel-gestion">Panel Gestion</Link>
          <a href="#contacto">Contacto</a>
        </div>

        <div className="nav__actions">
          {isAuthenticated ? (
            <div className="nav__auth">
              <Link className="nav__auth-link" to="/perfil">
                {user?.displayName || 'Perfil'}
              </Link>
              <button className="nav__logout" type="button" onClick={logout}>
                Salir
              </button>
            </div>
          ) : (
            <div className="nav__auth">
              <Link className="nav__auth-link nav__auth-link--primary" to="/login">
                Login
              </Link>
            </div>
          )}
          <Cart />
        </div>
      </div>
    </nav>
  )
}

export default Nav
