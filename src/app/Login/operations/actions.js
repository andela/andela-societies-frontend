import types from './types';

const fetchUser = user => ({ type: types.FETCH_USER, user });

export default fetchUser;
