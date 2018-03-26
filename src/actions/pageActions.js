import { TITLE_CHANGE } from '../types/pageActionTypes';
import pageInfo from '../helpers/pageInfo';

export const changeTitle = pathname => (
  dispatch => dispatch({
    type: TITLE_CHANGE,
    data: pageInfo.find(_pageInfo => _pageInfo.url === pathname),
  })
);

export default changeTitle;
