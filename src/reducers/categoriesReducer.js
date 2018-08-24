import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  EDIT_CATEGORY_FAILURE,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
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
  case CREATE_CATEGORY_REQUEST:
    return {
      ...state,
      message: {
        type: 'info',
        text: 'Creating ...',
      },
    };
  case CREATE_CATEGORY_FAILURE:
    return {
      ...state,
      error: action.error,
      message: {
        type: 'error',
        text: action.error.response ? action.error.response.data.message : 'An error has occurred',
      },
    };
  case CREATE_CATEGORY_SUCCESS: {
    return {
      ...state,
      categories: [action.category].concat(state.categories),
      message: {
        type: 'success',
        text: 'Category Created Successfully',
      },
    };
  }
  case DELETE_CATEGORY_REQUEST:
    return {
      ...state,
      updating: true,
    };
  case DELETE_CATEGORY_FAILURE:
    return {
      ...state,
      updating: false,
      error: action.error,
    };
  case DELETE_CATEGORY_SUCCESS: {
    const updatedCategories = state.categories.filter(category => (
      category.id !== action.id
    ));
    return {
      ...state,
      updating: false,
      categories: updatedCategories,
    };
  }
  case EDIT_CATEGORY_REQUEST:
    return {
      ...state,
      updating: true,
    };
  case EDIT_CATEGORY_SUCCESS: {
    const updatedCategories = state.categories.map(category => (
      category.id !== action.category.id ? category : action.category
    ));
    return {
      ...state,
      updating: false,
      message: {
        type: 'success',
        text: 'Category edited successfully ',
      },
      categories: updatedCategories,
    };
  }
  case EDIT_CATEGORY_FAILURE:
    return {
      ...state,
      updating: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default categories;
