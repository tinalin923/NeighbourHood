import { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { projectStorage } from '../firebase/config.js';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // create a reference of the file with full path
    const storageRef = ref(projectStorage, file.name);
    // upload to Cloud Storage
    const uploadTask = uploadBytesResumable(storageRef, file);
    // console.log(uploadTask);
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
        });
      }
    );
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
