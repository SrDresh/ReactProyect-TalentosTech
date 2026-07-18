import { Link, useNavigate } from 'react-router-dom'
import Cart from '../../Carrito/Cart'
import { useAuth } from '../../../context/AuthContext'
import './Nav.css'

const categorias = [
  { nombre: 'Motherboards', path: '/?categoria=Motherboards' },
  { nombre: 'Procesadores', path: '/?categoria=Procesadores' },
  { nombre: 'Fuentes', path: '/?categoria=Fuentes' },
  { nombre: 'Monitores', path: '/?categoria=Monitores' },
  { nombre: 'Placas de video', path: '/?categoria=Placas_de_video' }
]

function Nav() {
  const { user, logout } = useAuth();
  const esAdmin = user?.rol === 'admin';
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="nav">
      <div className="nav__content">
        <Link className="nav_position" to="/">
          Dresh Tech
        </Link>

        <ul className="nav__links">
          <li>
            <Link to="/">Inicio</Link>
          </li>

          <li className="nav__dropdown">
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
          </li>

          {esAdmin && (
            <li>
              <Link to="/panel-gestion">Panel Gestion</Link>
            </li>
          )}
         {esAdmin && (
         <li>
    <Link to="/admin/cupones">
        Gestión de Cupones
    </Link>
</li>
         )}
          <li>
            <a href="#contacto">Contacto</a>
          </li>

          <li>
            <Link to="/ProductosBD">ProductosBD</Link>
          </li>

          {user && (
            <li>
              <Link to="/perfil">Mi Perfil</Link>
            </li>
          )}
        </ul>

        <div className="nav__actions">
          {user ? (
            <button className="nav__login" type="button" onClick={handleLogout}>
              Salir
            </button>
          ) : (
            <Link className="nav__login" to="/login">
              Login
            </Link>
          )}
          <Cart />
        </div>
      </div>
    </nav>
  )
}

export default Nav
