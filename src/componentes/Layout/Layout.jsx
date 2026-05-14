import Footer from './Footer/Footer'
import Header from './Header/Header'
import Nav from './Nav//Nav'


export function Layout({children}){
    return (
        <div>
        <Nav/>
            <Header />
               
                {children}
             
            <Footer/>
        </div>
    );
}
