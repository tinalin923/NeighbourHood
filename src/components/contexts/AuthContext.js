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
import createInitialUserDatas from '../../hooks/firebase/user.js';
import { useEditState } from './EditContext.js';

export const AuthContext = createContext();
export const useAuthState = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUid, setCurrentUid] = useState();
  const [load, setLoad] = useState(true);
  const { getUserDatasFromFirestore } = useEditState();

  const signup = async (email, password, villageName) => {
    // write into firebase auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    // write into firestore
    return createInitialUserDatas(uid, email, villageName);
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        getUserDatasFromFirestore(uid);
        setCurrentUid(uid);
        console.log('get firebase');
        setLoad(false);
      } else {
        setCurrentUid(null);
        console.log('you logged out');
        setLoad(false);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 不懂為何會建議我要放setUserDatas；如果都不放[]，則會一直get firebase

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
