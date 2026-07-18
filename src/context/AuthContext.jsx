import React, { createContext, useState, useContext, useEffect } from 'react';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    const signup = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential?.user) {
            await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
                email,
                rol: 'user',
            }, { merge: true });
        }
        return userCredential;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDocRef = doc(db, 'usuarios', currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    const datosUsuario = userDocSnap.exists() ? userDocSnap.data() : {};
                    const rol = datosUsuario.rol === 'admin' ? 'admin' : 'user';
                    setUser({
                        ...currentUser,
                        rol,
                        email: datosUsuario.email || currentUser.email,
                        nombre: datosUsuario.nombre || currentUser.displayName || 'Usuario',
                    });
                } catch (error) {
                    console.error('Error al leer el usuario desde Firestore:', error);
                    setUser({ ...currentUser, rol: 'user' });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    const value = {
        user,
        loading,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};