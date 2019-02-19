import { CATEGORIES } from './constants';

const initialState = {
  categories: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === CATEGORIES.LOAD_SUCCESS) {
    return { ...state, categories: action.categories.data };
  }
  return state;
};

export default reducer;
