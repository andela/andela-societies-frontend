import types from './types';
import initialState from '../../../reducers/initialState';

const navbar = (state = initialState.navbar, { type, payload }) => {
  switch (type) {
  case types.SEARCH: {
    return {
      ...state,
      searchText: payload.query,
    };
  }
  default:
    return state;
  }
};

export default navbar;
