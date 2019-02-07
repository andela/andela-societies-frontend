import types from './types';
import initialState from '../../../reducers/initialState';

const login = (state = initialState.login, action) => {
  switch (action.type) {
  case types.FETCH_USER:
    return {
      user: action.user,
    };
  default:
    return state;
  }
};

export default login;
