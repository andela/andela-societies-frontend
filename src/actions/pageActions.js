import { TITLE_CHANGE } from '../types/pageActionTypes';
import pageInfo from '../helpers/pageInfo';

export const changeTitle = history => (
  dispatch => dispatch({
    type: TITLE_CHANGE,
    data: pageInfo.find(_pageInfo => _pageInfo.url === history.location.pathname),
  })
);

export default changeTitle;
