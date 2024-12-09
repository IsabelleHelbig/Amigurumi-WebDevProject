"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (provider) => {
    try {
      const result = await signInWithRedirect(auth, provider);
      console.log("User signed in successfully:", result.user);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const providerName =
          provider instanceof GithubAuthProvider ? "Google" : "GitHub";
        setErrorMessage(
          `You have previously signed in with ${providerName}. Please sign in with that account.`
        );
      }
    }
  };

  // GitHub Sign-In
  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return handleSignIn(provider);
  };

  // Google Sign-In
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return handleSignIn(provider);
  };

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        gitHubSignIn,
        googleSignIn,
        firebaseSignOut,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
