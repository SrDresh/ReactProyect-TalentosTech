import { Rutas } from "react-router-dom";
import { Layout } from "./componentes/Layout/Layout";
import ItemListContainer from "./componentes/ItemContainer/ItemContainer";
import './App.css'

function App() {
  return (
    <Layout>
      <Rutas>
      <ItemListContainer className='item-list_container' mensaje="Productos disponibles" />
      </Rutas>

    </Layout>
  );
}

export default App
