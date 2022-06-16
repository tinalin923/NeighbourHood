import React, { useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import ActivityBlock from '../blocks/ActivityBlock.js';
import BulletinBlock from '../blocks/BulletinBlock.js';
import ChiefIntroBlock from '../blocks/ChiefIntroBlock.js';
import HeroImageBlock from '../blocks/HeroImageBlock.js';
import VillageIntroBlock from '../blocks/VillageIntroBlock.js';
import { useAuthState } from '../components/contexts/AuthContext.js';
import { useEditState } from '../components/contexts/EditContext.js';
import EditingHeader from '../components/Edit/EditingHeader.js';
import ScrollList from '../components/Edit/ScrollList.js';
import ToggleMode from '../components/Edit/ToggleMode.js';
import UploadBtn from '../components/Edit/UploadBtn.js';
import AddEditionIcon from '../components/Edit/AddEditionIcon.js';
import {
  getFirestoreUserData,
  getFirestoreVillageData,
} from '../firebase/useFirestore.js';
import {
  backgroundGray,
  primaryYellow,
} from '../styles/styledComponents/color.js';

const Editing = () => {
  const { editMode, setEditMode, getDatasToContext, published } =
    useEditState();
  const { currentUid, setCurrentVillageId } = useAuthState();
  const [editPageLoading, setEditPageLoading] = useState(true);

  useEffect(() => {
    setEditMode(true);
    async function getVillageId(uid) {
      const data = await getFirestoreUserData(uid);
      const { villageId } = data;
      setCurrentVillageId(villageId);
      const villageDatas = await getFirestoreVillageData(villageId);
      const result = await getDatasToContext(villageDatas);
      setEditPageLoading(result);
    }
    getVillageId(currentUid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUid]);

  return (
    <>
      {editPageLoading && (
        <div
          style={{ width: '20vw', margin: '50vh auto', textAlign: 'center' }}
        >
          <BeatLoader
            size={20}
            color={`${primaryYellow}`}
            loading={editPageLoading}
            speedMultiplier={0.8}
          />
        </div>
      )}
      {!editPageLoading && (
        <div style={{ background: editMode ? `${backgroundGray}` : 'none' }}>
          <EditingHeader />
          <ScrollList />
          <ToggleMode />
          <HeroImageBlock name="0" />
          {published ? (
            <BulletinBlock name="1" />
          ) : (
            <ChiefIntroBlock name="1" />
          )}
          {published ? (
            <ActivityBlock name="2" />
          ) : (
            <VillageIntroBlock name="2" />
          )}
          {published ? (
            <VillageIntroBlock name="3" />
          ) : (
            <BulletinBlock name="3" />
          )}
          {published ? (
            <ChiefIntroBlock name="4" />
          ) : (
            <ActivityBlock name="4" />
          )}
          {editMode && <AddEditionIcon />}
          {editMode && <hr style={{ width: '90%', margin: ' 110px auto' }} />}
          {editMode && <UploadBtn />}
          {!editMode && <div style={{ height: '350px' }} />}
        </div>
      )}
    </>
  );
};

export default Editing;
