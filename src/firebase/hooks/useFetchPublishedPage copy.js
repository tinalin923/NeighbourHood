/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useMemo, useCallback } from 'react';
import { useTotalState } from '../../components/contexts/TotalContext.js';
import { villageCollection } from '../firebaseConfig.js';
import { getStorageImages } from '../useStorage.js';

const useFetchPublishedPage = () => {
  const {
    publishedVillages,
    setPublishedVillages,
    fetchError,
    fetchLoading,
    setFetchLoading,
    snap,
    setSnap,
  } = useTotalState();

  const Loop = useCallback(async (snapshot) => {
    let publishedArray = [];
    snapshot.forEach((doc) => {
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
    return publishedArrayWithUrl;
  }, []);

  const publishedVillagesDatas = useMemo(async () => {
    const publishedVillagesD = await Loop(snap);
    return publishedVillagesD;
  }, [snap, Loop]);

  useEffect(() => {
    setPublishedVillages(publishedVillagesDatas);
    setFetchLoading(false);
  }, [publishedVillagesDatas]);

  useEffect(() => {
    async function start() {
      if (!fetchLoading) {
        setFetchLoading(true);
        const q = query(villageCollection, where('published', '==', true));
        const querySnapshot = await getDocs(q);
        if (querySnapshot !== snap) {
          setSnap(querySnapshot);
        }
      }
    }
    start();
  }, []);

  return { publishedVillages, fetchError, fetchLoading };
};

export default useFetchPublishedPage;
