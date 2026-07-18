import { Routes, Route } from 'react-router-dom';
import { Layout } from './componentes/Layout/Layout';
import ItemListContainer from './componentes/ItemContainer/ItemContainer';
import FormContainer from './componentes/FormularioContainer/FormContainer';
import GestionCupones from './componentes/GestionCupones/GestionCupones';
import './App.css';
import ProductosBD from './componentes/ProductosBD/ProductosBD';
import ProtectedRoute from './componentes/Usuarios/ProtectedRoute';
import Login from './componentes/Usuarios/Login';
import Registro from './componentes/Usuarios/Registro';
import Perfil from './componentes/Usuarios/Perfil';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ItemListContainer mensaje="Productos Destacados" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/panel-gestion"
          element={
            <ProtectedRoute roles={['admin']}>
              <FormContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cupones"
          element={
            <ProtectedRoute roles={['admin']}>
              <GestionCupones />
            </ProtectedRoute>
          }
        />
        <Route path="/ProductosBD" element={<ProductosBD />} />
      </Routes>
    </Layout>
  );
}

export default App;
