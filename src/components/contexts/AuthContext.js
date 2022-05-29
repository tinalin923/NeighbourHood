import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import createInitialUserDatas from '../../firebase/createUser.js';
import { auth } from '../../firebase/firebaseConfig.js';

// import { useEditState } from './EditContext.js';

export const AuthContext = createContext();
export const useAuthState = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUid, setCurrentUid] = useState();
  const [currentVillageId, setCurrentVillageId] = useState();
  const [load, setLoad] = useState(true);

  const signup = async (email, password, city, village) => {
    // write into firebase auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    // write into firestore
    const newVillageId = await createInitialUserDatas(
      uid,
      email,
      city,
      village
    );
    console.log(newVillageId);
    setCurrentVillageId(newVillageId);
    return { uid, newVillageId };
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  // async function restoreAnnounceList(announceList) {
  //   let array = [];
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const announce of announceList) {
  //     // eslint-disable-next-line no-await-in-loop
  //     const storedUrl = await getStorageImages(announce.picture);
  //     if (!storedUrl) {
  //       array = array.concat({
  //         id: announce.id,
  //         title: announce.title,
  //         details: announce.details,
  //         picture: '',
  //       });
  //     } else {
  //       array = array.concat({
  //         id: announce.id,
  //         title: announce.title,
  //         details: announce.details,
  //         picture: storedUrl,
  //       });
  //     }
  //   }
  //   console.log(array);
  //   return array;
  // }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 不懂為何會建議我要放setUserDatas；如果都不放[]，則會一直get firebase

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    currentUid,
    currentVillageId,
    setCurrentVillageId,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!load && children}
    </AuthContext.Provider>
  );
};
