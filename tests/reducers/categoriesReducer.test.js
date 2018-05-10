import categoriesReducer from '../../src/reducers/categoriesReducer';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../../src/types';
import categories from '../../src/fixtures/categories';
import store from '../../src/fixtures/store';

describe('categoriesReducer', () => {
  const initialState = store.categories;

  it('should set default initial state', () => {
    expect(categoriesReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state when action is not defined', () => {
    expect(categoriesReducer(initialState, { type: 'DOES_NOT_EXIST' })).toEqual(initialState);
  });

  it('should handle FETCH_CATEGORIES_REQUEST', () => {
    expect(categoriesReducer(initialState, {
      type: FETCH_CATEGORIES_REQUEST,
    })).toEqual({
      requesting: true,
      categories: store.categories.categories,
      error: {},
    });
  });

  it('should handle FETCH_CATEGORIES_FAILURE', () => {
    expect(categoriesReducer(initialState, {
      type: FETCH_CATEGORIES_FAILURE,
      error: { error: 404 },
    })).toEqual({
      requesting: false,
      error: { error: 404 },
      categories: [],
    });
  });

  it('should handle FETCH_SOCIETY_INFO_SUCCESS', () => {
    expect(categoriesReducer(initialState, {
      type: FETCH_CATEGORIES_SUCCESS,
      categories,
    })).toEqual({
      requesting: false,
      error: {},
      categories,
    });
  });
});
