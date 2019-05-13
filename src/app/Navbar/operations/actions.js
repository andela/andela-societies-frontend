import types from './types';

const search = query => ({
  type: types.SEARCH,
  payload: { query },
});

export default {
  search,
};
