import { TITLE_CHANGE } from '../types/pageActionTypes';
import pageInfo from '../helpers/pageInfo';

export const changeTitle = (pathname) => {
  const pages = [...pageInfo.pages, ...pageInfo.societyPages];

  return (
    dispatch => dispatch({
      type: TITLE_CHANGE,
      data: pages.find(pageInfoData => pageInfoData.url === pathname),
    })
  );
};

export default changeTitle;
