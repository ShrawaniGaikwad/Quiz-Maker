// src/hooks/useAuth.js
import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../firebase'; // Adjust the path to your firebase config

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        setCurrentUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setCurrentUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return auth.signOut().then(() => {
      setCurrentUser(null);
    });
  };

  const value = {
    currentUser,
    signin,
    signup,
    signout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
