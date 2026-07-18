import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Perfil = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (!user) {
        return null;
    }

    return (
        <section style={{ maxWidth: '640px', margin: '3rem auto', padding: '2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
            <h2>Mi Perfil</h2>
            <p>¡Hola de nuevo, {user.email || 'usuario'}!</p>
            <p><strong>Rol:</strong> {user.rol === 'admin' ? 'Administrador' : 'Usuario'}</p>
            <button type="button" onClick={handleLogout} style={{ marginTop: '1rem', padding: '0.8rem 1.2rem', border: 'none', borderRadius: '999px', background: '#4f0e03', color: '#fff', cursor: 'pointer' }}>
                Cerrar Sesión
            </button>
        </section>
    );
};

export default Perfil;
