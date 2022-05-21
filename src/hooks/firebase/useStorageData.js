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
  userImages.forEach((userImage) => {
    // console.log(userImage);
    // console.log(userImage.name);

    if (!userImage) return;
    // 指向屬於該使用者的folder
    const storageRef = ref(projectStorage, `${currentUid}/${userImage.name}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, userImage).then((snapshot) => {
      console.log(snapshot.ref.name);
      console.log(snapshot.ref.fullPath);
      console.log('Uploaded a blob or file!');
    });
  });
};
