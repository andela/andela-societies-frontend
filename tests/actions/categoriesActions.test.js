import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  requestCategories,
  requestCategoriesFailure,
  requestCategoriesSuccess,
  fetchCategories,
} from '../../src/actions/categoriesActions';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../../src/types';
import categories from '../../src/fixtures/categories';
import storeFixture from '../../src/fixtures/store';
import config from '../../config';

const mockStore = configureMockStore([thunk]);

describe('Fetch Activity Categories', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to fetch categories', () => {
    const expectedAction = {
      type: FETCH_CATEGORIES_REQUEST,
    };
    expect(requestCategories()).toEqual(expectedAction);
  });

  it('should create an action to set error when get request fails', () => {
    const expectedAction = {
      type: FETCH_CATEGORIES_FAILURE,
      error: { error: 500 },
    };
    expect(requestCategoriesFailure({ error: 500 })).toEqual(expectedAction);
  });

  it('should create a success action after successfully fetching categories', () => {
    const expectedAction = {
      type: FETCH_CATEGORIES_SUCCESS,
      categories,
    };
    expect(requestCategoriesSuccess(categories)).toEqual(expectedAction);
  });

  it('dispatches FETCH_CATEGORIES_SUCCESS after successfuly fetching categories', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/activity-types`, {
      status: 200,
      response: { data: categories },
    });

    const expectedActions = [
      {
        type: FETCH_CATEGORIES_REQUEST,
      },
      {
        type: FETCH_CATEGORIES_SUCCESS,
        categories,
      },
    ];

    const store = mockStore({ categories: storeFixture.categories });

    return store.dispatch(fetchCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches FETCH_CATEGORIES_FAILURE when fetch categories fails', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/activity-types`, {
      status: 401,
      response: {},
    });

    const expectedActions = [
      {
        type: FETCH_CATEGORIES_REQUEST,
      },
      {
        type: FETCH_CATEGORIES_FAILURE,
        error: new Error('Request failed with status code 401'),
      },
    ];

    const store = mockStore({ categories: [] });

    return store.dispatch(fetchCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
