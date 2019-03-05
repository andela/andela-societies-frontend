import types from './types';
import initialState from '../../../reducers/initialState';

const society = (state = initialState.society, action) => {
  switch (action.type) {
  case types.SOCIETY_PAGE_LOADING:
    return {
      ...state,
      loading: true,
    };
  case types.SOCIETY_PAGE_ERROR:
    return {
      ...state,
      error: true,
    };
  case types.FETCH_SOCIETY_INFO_SUCCESS:
    const {
      totalPoints, usedPoints, remainingPoints, activitiesLogged,
    } = action.payload;
    return {
      ...state,
      totalPoints,
      usedPoints,
      remainingPoints,
      activitiesLogged,
    };
    default:
      return state;
  }
};

export default society;
