import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { projectStorage } from '../../firebase/firebaseConfig.js';

export function getStorageImages(fullPath) {
  const imgRef = ref(projectStorage, fullPath);
  // getDownloadURL(imgRef)
  //   .then((url) => {
  //     console.log(url);
  //     return url;
  //     // ImgArea.src = url
  //     // const img = document.getElementById('myimg');
  //     // img.setAttribute('src', url);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  const url = getDownloadURL(imgRef);
  console.log(url);
  return url;
}

export const upLoadStorageImages = (currentUid, userImages) => {
  // // 因為是由物件堆成的一陣列，所以要取values (太複雜所以先放棄key的設定)
  // const ImagesBlob = Object.values(userImages);
  // console.log(ImagesBlob);
  userImages.forEach((ImageBlob) => {
    if (!ImageBlob) return;
    // 指向屬於該使用者的folder
    const storageRef = ref(projectStorage, `${currentUid}/${ImageBlob.name}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, ImageBlob).then((snapshot) => {
      console.log(snapshot.ref.fullPath);
      console.log('Uploaded a blob or file!');
    });
  });
};
