/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';

import createInitialUserDatas, {
  checkCityVillage,
} from '../../firebase/createUser.js';
import { auth, db } from '../../firebase/firebaseConfig.js';

export const AuthContext = createContext();
export const useAuthState = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUid, setCurrentUid] = useState();
  const [currentVillageId, setCurrentVillageId] = useState();
  const [currentVillageName, setCurrentVillageName] = useState();
  const [load, setLoad] = useState(true);

  const signup = async (email, password, city, village) => {
    // check if repeated
    const checkResult = await checkCityVillage(city, village);
    if (checkResult === 'repeated') {
      throw new Error(`此縣市的${village}已被註冊`);
    }
    // write into firebase-authentication if not repeated
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;
    // write into firestore
    const { newVillageId } = await createInitialUserDatas(
      uid,
      email,
      city,
      village
    );
    setCurrentVillageId(newVillageId);
    setCurrentVillageName(village);
    setLoad(false);

    return { uid, newVillageId };
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        setCurrentUid(uid);
      } else {
        setCurrentUid(null);
        setLoad(false);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentUid) {
      return;
    }
    const userRef = doc(db, 'users', currentUid);
    async function getVillageName() {
      const docSnap = await getDoc(userRef);
      const nowVillageName = docSnap.data()?.villageName;
      setCurrentVillageName(nowVillageName);
      setLoad(false);
    }
    getVillageName();
  }, [currentUid]);

  const value = {
    currentUid,
    currentVillageId,
    currentVillageName,
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

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
