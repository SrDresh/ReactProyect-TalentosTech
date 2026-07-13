import { useCallback, useEffect, useMemo, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const register = useCallback(async ({ nombre, email, password }) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password);

        if (nombre) {
            await updateProfile(credential.user, { displayName: nombre });
            setUser(auth.currentUser);
        }

        return credential;
    }, []);

    const logout = useCallback(() => {
        return signOut(auth);
    }, []);

    const value = useMemo(
        () => ({
            user,
            loading,
            isAuthenticated: Boolean(user),
            login,
            register,
            logout,
        }),
        [user, loading, login, register, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
