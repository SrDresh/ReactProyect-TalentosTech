import './Header.css'

function Header() {
    return (
       <header className="site-header">
             <section className="hero">
               <div className="hero__copy">
                 <p className="hero__eyebrow">Dresh Tech Store</p>
                 <h1>Los mejores Componentes, perifericos y equipos para tu setup</h1>
                 <p className="hero__text">
                   Un home de e-commerce pensado para mostrar hardware, perifericos y
                   ofertas con una estructura clara, reutilizable y alineada con la cursada.
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
