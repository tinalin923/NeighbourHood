export const initialEditState = {
  isEditMode: true,
  heroImage: '',
  chiefAvator: '',
  chiefName: '',
  chiefInfo: '',
  villageImageList: [],
  villageInfo: '',
  blockList: [
    { id: '0', title: '' },
    { id: '1', title: 'chiefIntro' },
    { id: '2', title: 'villageIntro' },
  ],
  scrollList: [
    { id: '0', title: '平安里' },
    { id: '1', title: '里長介紹' },
    { id: '2', title: '村里介紹' },
  ],
};

const editReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_EDITMODE':
      console.log('change');
      return { ...state, isEditMode: payload.isEditMode };
    case 'SET_HEROIMAGE':
      return { ...state, heroImage: payload.heroImage };
    case 'SET_CHIEF_AVATOR':
      return { ...state, chiefAvator: payload.chiefAvator };
    case 'SET_CHIEF_NAME':
      return { ...state, chiefName: payload.chiefName };
    case 'SET_CHIEF_INFO':
      return { ...state, chiefInfo: payload.chiefInfo };
    case 'SET_VILLAGE_IMAGE_LIST':
      return { ...state, isEditMode: !payload };
    case 'SET_VILLAGE_INFO':
      return { ...state, isEditMode: !payload };
    case 'ADD_BLOCK_LIST':
      return { ...state, isEditMode: !payload };
    case 'DELETE_BLOCK_LIST':
      return { ...state, isEditMode: !payload };
    case 'ADD_SCROLL_LIST':
      return { ...state, scrollList: payload.scrollList };
    default:
      throw new Error(`No case for type ${type} found in editRedcer`);
  }
};

export default editReducer;
