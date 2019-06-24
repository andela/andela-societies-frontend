import types from './types';
import initialState from '../../../reducers/initialState';

const sidebar = (state = initialState.sidebar, { type, payload }) => {
  switch (type) {
  case types.FETCH_USER_ROLE_SUCCESS:
    return {
      ...state,
      userRole: payload.role,
    };
  case types.FETCH_USER_ROLE_ERROR:
    return {
      ...state,
      error: payload.error,
    };
  default:
    return state;
  }
};

export default sidebar;
