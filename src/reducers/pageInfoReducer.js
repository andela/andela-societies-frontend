import { TITLE_CHANGE } from '../types';

const pageInfo = (state = { title: '', url: '' }, action) => {
  switch (action.type) {
  case TITLE_CHANGE:
    return action.data;
  default:
    return state;
  }
};

export default pageInfo;
