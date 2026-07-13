import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import "./Auth.css";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || "/perfil";

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({ ...currentData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await login(formData.email, formData.password);
            navigate(redirectTo, { replace: true });
        } catch {
            setError("No pudimos iniciar sesion. Revisa el email y la contrasena.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Iniciar sesion</h1>
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
                    {isSubmitting ? "Ingresando..." : "Ingresar"}
                </button>
                <p>
                    Si no tenes una cuenta podes registrarte{" "}
                    <Link to="/registro">aca</Link>.
                </p>
            </form>
        </section>
    );
}

export default Login;
