import { useAuth } from "./useAuth";
import "./Auth.css";

function Profile() {
    const { user, logout } = useAuth();

    return (
        <section className="profile-page">
            <div className="profile-panel">
                <p className="profile-panel__eyebrow">Area privada</p>
                <h1>Mi perfil</h1>
                <p>
                    Sesion iniciada como{" "}
                    <strong>{user.displayName || user.email}</strong>
                </p>
                <p>Email: {user.email}</p>
                <button type="button" onClick={logout}>
                    Cerrar sesion
                </button>
            </div>
        </section>
    );
}

export default Profile;
