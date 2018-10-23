import { PAGE_HEADER_TITLE_CHANGE } from '../types';

const SocietyPageHeaderTitle = (state = 'Activities', action) => {
  switch (action.type) {
  case PAGE_HEADER_TITLE_CHANGE:
    return action.data;
  default:
    return state;
  }
};

export default SocietyPageHeaderTitle;
