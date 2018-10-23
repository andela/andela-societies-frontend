import { PAGE_HEADER_TITLE_CHANGE } from '../types';

export const changeSocietyPageHeaderTitle = societyPageHeadertitle => (
  dispatch => dispatch({
    type: PAGE_HEADER_TITLE_CHANGE,
    data: societyPageHeadertitle,
  })
);

export default changeSocietyPageHeaderTitle;
