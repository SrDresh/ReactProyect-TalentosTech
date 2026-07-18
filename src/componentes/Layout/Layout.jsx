import Footer from './Footer/Footer'
import Header from './Header/Header'
import Nav from './Nav/Nav'

export function Layout({ children }) {
    return (
        <div className="app-shell">
            <Nav />
            <div className="app-layout">
                <Header />
                <main className="app-main">{children}</main>
            </div>
            <Footer />
        </div>
    );
}
