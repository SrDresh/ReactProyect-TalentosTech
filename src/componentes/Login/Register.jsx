import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import "./Auth.css";

function Register() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({ ...currentData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await register(formData);
            navigate("/perfil", { replace: true });
        } catch {
            setError("No pudimos crear la cuenta. Proba con otro email o una contrasena mas segura.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <label>
                    Nombre
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Contrasena
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="6"
                        required
                    />
                </label>
                {error ? <p className="auth-form__error">{error}</p> : null}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                </button>
                <p>
                    Ya tenes cuenta? <Link to="/login">Inicia sesion</Link>
                </p>
            </form>
        </section>
    );
}

export default Register;
