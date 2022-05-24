export const initialEditState = {
  published: false,
  isEditMode: true,
  introductionTextData: [
    { chiefName: '' },
    { chiefInfo: '' },
    { villageInfo: '' },
  ],
  imagePathList: [
    { heroImage: '' },
    { chiefAvator: '' },
    { villageImageList: [] },
    { announceImage: [] },
  ],
  imageList: [
    { heroImage: '' },
    { chiefAvator: '' },
    { villageList: [] },
    { announceImage: [] },
  ],
  scrollList: [],
  blockList: [
    { id: '0', title: 'heroImage' },
    { id: '1', title: 'chiefIntro' },
    { id: '2', title: 'villageIntro' },
    { id: '3', title: 'bulletin' },
  ],
  announceList: [{ id: '', title: '', details: '', picture: '' }], // picture: path
  announcePresentList: [{ id: '', title: '', details: '', picture: '' }], // picture: url
  eventList: [
    {
      id: 0,
      date: '',
      title: '',
      picture: '',
      details: '',
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
    case 'SET_ANNOUNCE_PRESENT_LIST':
      return { ...state, announcePresentList: payload.announcePresentList };
    case 'ADD_ANNOUNCE_PRESENT_LIST':
      return { ...state, announcePresentList: payload.announcePresentList };
    case 'DELETE_ANNOUNCE_PRESENT_LIST':
      return { ...state, announcePresentList: payload.announcePresentList };

    default:
      throw new Error(`No case for type ${type} found in editRedcer`);
  }
};

export default editReducer;
