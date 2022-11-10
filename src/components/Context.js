import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

const UserContext = createContext();

export const Context = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  });

  const logout = () => {
    return signOut(auth);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const verification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const resetPWD = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signin, verification, resetPWD }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
