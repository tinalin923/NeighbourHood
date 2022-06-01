/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { projectStorage } from './firebaseConfig.js';

export async function getStorageImages(fullPath) {
  if (!fullPath) return false;
  const imgRef = ref(projectStorage, fullPath);
  const url = await getDownloadURL(imgRef);
  console.log(url);
  return url;
}

export const upLoadStorageImages = (currentUid, userImages) =>
  new Promise((resolve) => {
    async function start() {
      for (const imageBlob of userImages) {
        console.log(imageBlob);
        const storageRef = ref(
          projectStorage,
          `${currentUid}/${imageBlob.name}`
        );
        const url = await uploadBytes(storageRef, imageBlob);
        console.log(url);
      }
      resolve('success');
    }
    start();
  });
