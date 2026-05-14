import './Header.css'

function Header() {
    return (
       <header className="site-header">
             <section className="hero">
               <div className="hero__copy">
                 <h1 className="hero_text-top">Los mejores componentes, perifericos y equipos para tu setup</h1>
                 <p className="hero__text">
                  Una tienda que pienjsa en vos para mostrarte los mejores hardware, perifericos y las
                   ofertas que necesitas para mejorar tu vida.
                 </p>
                 <div className="hero__actions">
                   <a href="#productos" className="hero__button hero__button--primary">
                     Ver productos
                   </a>
                   <a href="#categorias" className="hero__button hero__button--secondary">
                     Explorar categorias
                   </a>
                 </div>
               </div>
             </section>
           </header>
    );
}
export default Header;
