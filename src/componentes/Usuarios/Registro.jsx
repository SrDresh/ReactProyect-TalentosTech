import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup(email, password);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('Este correo ya está registrado. Intentá iniciar sesión.');
            } else {
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error('Error en el registro:', error.message);
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Crear una nueva cuenta</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Registrarse</button>
            </form>
            <p>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default Registro;