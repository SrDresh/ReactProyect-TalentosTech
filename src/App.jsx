import { Routes, Route} from "react-router-dom";
import { Layout } from "./componentes/Layout/Layout";
import ItemListContainer from "./componentes/ItemContainer/ItemContainer";
import FormContainer from "./componentes/FormularioContainer/FormContainer"
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<ItemListContainer mensaje="Productos disponibles" />}  />
        
        <Route
          path="/solicitud-producto"
          element={<FormContainer />}
        />
      </Routes>
    </Layout>
  )
}

export default App
/*/<ItemListContainer className='item-list_container' mensaje="Productos disponibles" />*/