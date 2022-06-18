export const initialEditItemState = {
  temporaryUrl: '',
  imageError: '',
  id: '',
  title: '',
  details: '',
};

const editItemReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TEMPORARY_URL':
      return { ...state, temporaryUrl: payload.temporaryUrl };
    case 'SET_IMAGE_ERROR':
      return { ...state, imageError: payload.imageError };

    case 'SET_ID':
      return { ...state, id: payload.id };
    case 'SET_TITLE':
      return { ...state, title: payload.title };
    case 'SET_DETAILS':
      return { ...state, details: payload.details };

    default:
      throw new Error();
  }
};

export default editItemReducer;
