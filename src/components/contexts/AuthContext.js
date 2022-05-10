import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig.js';

export const AuthContext = createContext();
export const useAuthState = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const signup = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const login = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const { uid } = user;
        console.log(uid);
      } else {
        setCurrentUser();
        console.log('you logged out');
      }
    });
    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      signup,
      login,
      logout,
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
