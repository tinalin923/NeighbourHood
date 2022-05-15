import imageCompression from 'browser-image-compression';

const compressImage = async (imageFile, width) => {
  const options = {
    maxSizeMB: 0.6,
    maxWidthOrHeight: width,
    useWebWorker: true,
  };
  try {
    const compressedImage = await imageCompression(imageFile, options);
    return compressedImage;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export default compressImage;
