/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-promise-executor-return */
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { projectStorage } from '../../firebase/firebaseConfig.js';

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

// for (const ImageBlob of userImages) {
//     const storageRef = ref(projectStorage, `${currentUid}/${ImageBlob.name}`);
//     if (!ImageBlob) {
//       console.log(ImageBlob);
//       return false
//     }
//     const url = await uploadImage(storageRef, ImageBlob);
//   }
// }
// // 因為是由物件堆成的一陣列，所以要取values (太複雜所以先放棄key的設定)
// const ImagesBlob = Object.values(userImages);
// forEach不可以用break.return來中斷
// new Promise((resolve, reject) => {
//   console.log(userImages);
//   for (const ImageBlob of userImages) {
//     if (!ImageBlob) {
//       console.log(ImageBlob);
//       reject(new Error('no images to upload'));
//       return false;
//     }
//     console.log(ImageBlob.name);
//     const storageRef = ref(projectStorage, `${currentUid}/${ImageBlob.name}`);
//     // 'file' comes from the Blob or File API
//     uploadBytes(storageRef, ImageBlob).then((snapshot) => {
//       console.log(snapshot.ref.fullPath);
//       console.log('Uploaded a blob or file!');
//       resolve('success');
//       return true;
//     });
//   }
//   console.log('where');
// });

// userImages.forEach((ImageBlob) => {
//   if (!ImageBlob) {
//     console.log(ImageBlob);
//     resolve('no images to upload');
//     return false;
//   }
//   // 指向屬於該使用者的folder
//   console.log(ImageBlob.name);
//   const storageRef = ref(projectStorage, `${currentUid}/${ImageBlob.name}`);
//   // 'file' comes from the Blob or File API
//   uploadBytes(storageRef, ImageBlob).then((snapshot) => {
//     console.log(snapshot.ref.fullPath);
//     console.log('Uploaded a blob or file!');
//     resolve('success');
//     return true;
//   });
// });
