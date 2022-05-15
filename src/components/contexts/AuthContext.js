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
import createUserData from '../../firebase/firestore/user.js';

export const AuthContext = createContext();
export const useAuthState = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUid, setCurrentUid] = useState();
  const [load, setLoad] = useState(true);

  const signup = async (email, password, villageName) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    return createUserData(uid, email, villageName);
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        setCurrentUid(uid);
        setLoad(false);
      } else {
        setCurrentUid(null);
        console.log('you logged out');
        setLoad(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      currentUid,
      signup,
      login,
      logout,
    }),
    [currentUid]
  );

  return (
    <AuthContext.Provider value={value}>
      {!load && children}
    </AuthContext.Provider>
  );
};
