import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { auth } from '../../firebase/firebaseConfig.js';

export const AuthContext = createContext();
export const useAuthState = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
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

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
