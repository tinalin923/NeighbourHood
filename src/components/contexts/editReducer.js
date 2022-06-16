export const initialEditState = {
  published: false,
  introductionTextData: [
    { chiefName: '' },
    { chiefInfo: '' },
    { villageInfo: '' },
  ],
  scrollList: [],
  blockList: [],
  imagePathList: [
    { heroImage: '' },
    { chiefAvator: '' },
    { villageImage: [] },
    { announceImage: [] },
    { activityImage: [] },
  ],
  imageList: [
    { heroImage: '' },
    { chiefAvator: '' },
    { villageImage: [] },
    { announceImage: [] },
    { activityImage: [] },
  ],
  announceList: [{ id: '', title: '', details: '', picture: '' }], // picture: path
  announcePresentList: [{ id: '', title: '', details: '', picture: '' }], // picture: url
  activityList: [{ id: '', title: '', details: '', picture: '' }], // picture: path
  activityPresentList: [{ id: '', title: '', details: '', picture: '' }], // picture: url
};

const editReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TEXT_INTRODUCTION':
      return { ...state, introductionTextData: payload.introductionTextData };
    case 'SET_SCROLL_LIST':
      return { ...state, scrollList: payload.scrollList };
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
    case 'SET_ACTIVITY_LIST':
      return { ...state, activityList: payload.activityList };
    case 'ADD_ACTIVITY_LIST':
      return { ...state, activityList: payload.activityList };
    case 'DELETE_ACTIVITY_LIST':
      return { ...state, activityList: payload.activityList };
    case 'SET_ACTIVITY_PRESENT_LIST':
      return { ...state, activityPresentList: payload.activityPresentList };
    case 'ADD_ACTIVITY_PRESENT_LIST':
      return { ...state, activityPresentList: payload.activityPresentList };
    case 'DELETE_ACTIVITY_PRESENT_LIST':
      return { ...state, activityPresentList: payload.activityPresentList };

    default:
      throw new Error(`No case for type ${type} found in editRedcer`);
  }
};

export default editReducer;
