import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig.js';

const useFirestore = (coversCollection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // const unsubscribe = onSnapshot(
    //   doc(projectFirestore, 'covers', 'FRyHLDDm6pcSjFWeVmky'),
    //   (doC) => {
    //     console.log('Current data: ', doC.data());
    //   }
    // );
    const q = query(collection(db, 'covers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = [];
      snapshot.forEach((docu) => {
        documents.push({ ...docu.data(), id: docu.id });
        setDocs(documents);
        console.log(documents);
      });
    });
    return () => unsubscribe();
  }, [coversCollection]);

  return { docs };
};

export default useFirestore;
