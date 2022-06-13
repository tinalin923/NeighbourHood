/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { projectStorage } from './firebaseConfig.js';

export async function getStorageImages(fullPath) {
  if (!fullPath) return false;
  const imgRef = ref(projectStorage, fullPath);
  const url = await getDownloadURL(imgRef);
  return url;
}

export const upLoadStorageImages = (currentUid, userImages) =>
  new Promise((resolve) => {
    async function start() {
      for (const imageBlob of userImages) {
        const storageRef = ref(
          projectStorage,
          `${currentUid}/${imageBlob.name}`
        );
        await uploadBytes(storageRef, imageBlob);
      }
      resolve('success');
    }
    start();
  });
