import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../types';
import initialState from './initialState';

/**
 * @function categories
 * categories reducer
 *
 * @param {Object} state categories initial state
 * @param {Object} action
 * @returns {Object} categories state
 */
const categories = (state = initialState.categories, action) => {
  switch (action.type) {
  case FETCH_CATEGORIES_REQUEST:
    return {
      ...state,
      requesting: true,
    };
  case FETCH_CATEGORIES_FAILURE:
    return {
      ...state,
      requesting: false,
      error: action.error,
    };
  case FETCH_CATEGORIES_SUCCESS:
    return {
      ...state,
      requesting: false,
      categories: action.categories,
    };
  default:
    return state;
  }
};

export default categories;
