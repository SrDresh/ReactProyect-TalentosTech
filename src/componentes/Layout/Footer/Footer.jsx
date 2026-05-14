import './Footer.css'

const integrantes = [
  {
    nombre: 'Diego',
    rol: 'Frontend',
    descripcion: 'Ecargado de la interfaz, la estructura de componentes y la experiencia visual del usuario.',
  },
  {
    nombre: 'Marcos',
    rol: 'Catalogo',
    descripcion: 'Organiza productos, categorias y la forma en que los datos se presentan en la tienda.',
  },
  {
    nombre: 'Martin',
    rol: 'Integracion',
    descripcion: 'Trabaja el flujo entre componentes, estados y consumo de datos para que la app funcione.',
  },
  {
    nombre: 'German',
    rol: 'Contenido',
    descripcion: 'Aporta informacion del proyecto, copy, soporte visual y consistencia general del sitio.',
  },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <section className="site-footer__intro">
          <p className="site-footer__eyebrow">Equipo del proyecto</p>
          <h2>DreshTech Store</h2>
          <p>
           E-commerce de Hardware de Computacion.<br /> Los mejores productos para tu setup
            
          </p>
        </section>
        <section className="site-footer__support" id="contacto">
          <h3>Soporte</h3>
          <p>Buenos Aires, Argentina</p>
          <p>ventas@dreshtech.com</p>
          <p>Lunes a Viernes de 9 a 18 hs</p>
        </section>
      </div>

      <div className="site-footer__team">
        {integrantes.map((integrante) => (
          <article key={integrante.nombre} className="team-card">
            <div className="team-card__avatar" aria-hidden="true">
              {integrante.nombre.slice(0, 1)}
            </div>
            <p className="team-card__role">{integrante.rol}</p>
            <h3>{integrante.nombre}</h3>
            <p>{integrante.descripcion}</p>
          </article>
        ))}
      </div>
    </footer>
  )
}

export default Footer