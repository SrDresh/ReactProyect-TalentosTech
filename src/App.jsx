import { Routes, Route } from "react-router-dom";
import { Layout } from "./componentes/Layout/Layout";
import ItemListContainer from "./componentes/ItemContainer/ItemContainer";
import FormContainer from "./componentes/FormularioContainer/FormContainer"
import Login from "./componentes/Login/Login";
import Register from "./componentes/Login/Register";
import Profile from "./componentes/Login/Profile";
import ProtectedRoute from "./componentes/Login/ProtectedRoute";
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<ItemListContainer mensaje="Productos disponibles" />} />

        <Route
          path="/solicitud-producto"
          element={
            <ProtectedRoute>
              <FormContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/panel-gestion"
          element={
            <ProtectedRoute rolesPermitidos={"admin"}>
              <FormContainer />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
/*/<ItemListContainer className='item-list_container' mensaje="Productos disponibles" />*/
