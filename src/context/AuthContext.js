import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'

// import { setDoc , doc, addDoc, collection } from "firebase/firestore";

const AuthContext = createContext()

export function AuthContextProvider({ children }) {

    const [user , setUser] = useState({})

    const signUp = async (email , password , name) => {
        try {
            await createUserWithEmailAndPassword(auth , email , password).catch((error) => {
                console.log(error)
            })

            await updateProfile(auth.currentUser, {displayName : name}).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
        
        // addDoc(collection(db , 'users' , email , 'favorite') , {
            
        // })
        // const docRef = await addDoc(collection(db, email), {
            
        //   });
    }

    const logIn = (email , password) => {
        return signInWithEmailAndPassword(auth , email , password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
            setUser(currentUser)
        });

        return () => {
            unsubscribe()
        }
    })

    return (
        <AuthContext.Provider value={{signUp , logIn , logOut , user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}