import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, updatePassword, sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase.config";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../utilities/URLs";

export const AuthContext = new createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleLogin = () => signInWithPopup(auth, googleProvider);

    const logOut = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your have successfully logged out',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => toast.error(error.message))
    }

    const changeInfo = (info) => {
        setLoading(true);
        return updateProfile(auth.currentUser, info)
    }

    const changePassword = (newPassword) => updatePassword(auth.currentUser, newPassword)

    const resetPassword = (email) => sendPasswordResetEmail(auth, email)

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, async (user) => {
            console.log('user from authProvider', user);
            setUser(user);

            if(user){
                await axios.post(`${baseUrl}/jwt`, {user: {email: user.email}})
                .then(data => {
                    localStorage.setItem('proActive-token', data.data);
                    setLoading(false);
                })
                .catch(error => console.log(error))
            } else{
                localStorage.removeItem('bistro-token')
            }

            setLoading(false);
        });
        return unSub;
    }, [])

    const authInfo = {
        user,
        loading,
        createAccount,
        logIn,
        googleLogin,
        logOut,
        changeInfo,
        changePassword,
        resetPassword
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;