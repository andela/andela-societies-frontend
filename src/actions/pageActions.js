import { TITLE_CHANGE } from '../types/pageActionTypes';
import pageInfo from '../helpers/pageInfo';

export const changeTitle = pathname => (
  dispatch => dispatch({
    type: TITLE_CHANGE,
    data: pageInfo.pages.find(pageInfoData => pageInfoData.url === pathname),
  })
);

export default changeTitle;
