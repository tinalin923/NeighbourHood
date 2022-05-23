export const initialEditState = {
  published: false,
  isEditMode: true,
  heroImage: '',
  chiefAvator: '',
  introductionTextData: [],
  villageImageList: [],
  scrollList: [],
  blockList: [
    { id: '0', title: 'heroImage' },
    { id: '1', title: 'chiefIntro' },
    { id: '2', title: 'villageIntro' },
    { id: '3', title: 'bulletin' },
  ],
  announceList: [],
  eventList: [
    {
      id: 0,
      date: '',
      title: '垃圾車時間',
      picture: '',
      details: '明天下午五點才會來',
    },
    {
      id: 1,
      date: '',
      title: '捐血活動',
      picture: '',
      details:
        '在永康公園前的空地，欲參加者，請勿熬夜，並記得攜帶健保卡，感謝配合。',
    },
  ],
};

const editReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TEXT_INTRODUCTION':
      return { ...state, introductionTextData: payload.introductionTextData };
    case 'TOGGLE_EDITMODE':
      return { ...state, isEditMode: payload.isEditMode };
    case 'SET_HEROIMAGE':
      return { ...state, heroImage: payload.heroImage };
    case 'SET_CHIEF_AVATOR':
      return { ...state, chiefAvator: payload.chiefAvator };
    // case 'SET_CHIEF_NAME':
    //   return { ...state, chiefName: payload.chiefName };
    // case 'SET_CHIEF_INFO':
    //   return { ...state, chiefInfo: payload.chiefInfo };
    case 'SET_VILLAGE_IMAGE_LIST':
      return { ...state, isEditMode: !payload };
    // case 'SET_VILLAGE_INFO':
    //   return { ...state, isEditMode: !payload };
    case 'SET_SCROLL_LIST':
      return { ...state, scrollList: payload.scrollList };
    case 'ADD_SCROLL_LIST':
      return { ...state, scrollList: payload.scrollList };
    case 'ADD_BLOCK_LIST':
      return { ...state, isEditMode: !payload };
    case 'DELETE_BLOCK_LIST':
      return { ...state, isEditMode: !payload };
    case 'SET_ANNOUNCE_LIST':
      return { ...state, announceList: payload.announceList };
    case 'ADD_ANNOUNCE_LIST':
      return { ...state, announceList: payload.announceList };
    case 'DELETE_ANNOUNCE_LIST':
      return { ...state, announceList: payload.announceList };

    default:
      throw new Error(`No case for type ${type} found in editRedcer`);
  }
};

export default editReducer;
