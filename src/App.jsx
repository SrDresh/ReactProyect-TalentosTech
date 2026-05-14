import { Layout } from "./componentes/Layout/Layout";
import ItemListContainer from "./componentes/ItemContainer/ItemContainer";

function App() {
  return (
    <Layout>
      <ItemListContainer className='item-list_container' mensaje="Productos disponibles" />
    </Layout>
  );
}

export default App
