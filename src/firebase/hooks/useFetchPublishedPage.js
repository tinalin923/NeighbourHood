/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { villageCollection } from '../firebaseConfig.js';
import { getStorageImages } from '../useStorage.js';

const useFetchPublishedPage = () => {
  const [publishedVillages, setPublishedVillages] = useState();
  const [fetchError, setFetchError] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);

  async function getPublishedVillageData() {
    const q = query(villageCollection, where('published', '==', true));
    try {
      const querySnapshot = await getDocs(q);
      let publishedArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        publishedArray = publishedArray.concat({
          id: data.villageId.toString(),
          cityName: data.cityName,
          villageName: data.villageName,
          heroImage: data.imagePathList.heroImage,
        });
      });

      let publishedArrayWithUrl = [];
      for (const village of publishedArray) {
        const heroImageUrl = await getStorageImages(village.heroImage);
        publishedArrayWithUrl = publishedArrayWithUrl.concat({
          ...village,
          heroImage: heroImageUrl,
        });
      }
      setPublishedVillages(publishedArrayWithUrl);
      console.log(publishedArrayWithUrl);
    } catch (error) {
      setFetchError(error.message);
      console.log(error);
    }
    setFetchLoading(false);
  }
  useEffect(() => {
    if (!fetchLoading) {
      setFetchLoading(true);
      getPublishedVillageData();
    }
  }, []);

  return { publishedVillages, fetchError, fetchLoading };
};

export default useFetchPublishedPage;
