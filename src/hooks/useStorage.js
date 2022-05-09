import { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { projectStorage, db } from '../firebase/firebaseConfig.js';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // create a reference of the file with full path
    const storageRef = ref(projectStorage, file.name);
    // make a reference to a collection we wnat to save
    const coversCollectionRef = collection(db, 'covers');
    // set the funciton of adding doc into the collection
    function addNewDocument(dUrl) {
      try {
        const createdAt = serverTimestamp();
        const imageData = {
          url: { dUrl },
          time: { createdAt },
        };
        addDoc(coversCollectionRef, imageData);
      } catch (e) {
        console.error(`Error adding document:${e}`);
      }
    }
    // upload file to Cloud Storage
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    // Only using 'uploadBytesResumable', can you listen for the state changes !!!
    uploadTask.on(
      'state_changed',
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      () => {
        // 'snapshot' is a prop of uploadTask
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setUrl(downloadUrl);
          console.log(downloadUrl);
          addNewDocument(downloadUrl);
        });
      }
    );
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
