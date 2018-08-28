import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  deleteCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryRequest,
  deleteCategory,
} from '../../src/actions/deleteCategoryActions';
import {
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
} from '../../src/types';
import categories from '../../src/fixtures/categories';
import config from '../../config';

const mockStore = configureMockStore([thunk]);
let store;

describe('Delete Category Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to delete a category', () => {
    const expectedAction = {
      type: DELETE_CATEGORY_REQUEST,
    };
    expect(deleteCategoryRequest()).toEqual(expectedAction);
  });

  it('should create an action to set error when delete request fails', () => {
    const expectedAction = {
      type: DELETE_CATEGORY_FAILURE,
      error: { error: 500 },
    };
    expect(deleteCategoryFailure({ error: 500 })).toEqual(expectedAction);
  });

  it('should create a success action after successfully deleting the category', () => {
    const expectedAction = {
      type: DELETE_CATEGORY_SUCCESS,
      id: categories[0].id,
    };
    expect(deleteCategorySuccess(categories[0].id)).toEqual(expectedAction);
  });

  it('dispatches DELETE_CATEGORY_SUCCESS after successfuly deleting the category', () => {
    store = mockStore({ categories });

    const expectedActions = [
      {
        type: DELETE_CATEGORY_REQUEST,
      },
      {
        type: DELETE_CATEGORY_SUCCESS,
        id: categories[0].id,
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/activity-types/${categories[0].id}`, {
      status: 204,
    });

    return store.dispatch(deleteCategory(categories[0].id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches DELETE_CATEGORY_FAILURE after deleting the category fails', () => {
    store = mockStore({ categories });

    const expectedActions = [
      {
        type: DELETE_CATEGORY_REQUEST,
      },
      {
        type: DELETE_CATEGORY_FAILURE,
        error: new Error('Request failed with status code 400'),
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/activity-types/${categories[0].id}`, {
      status: 400,
    });

    return store.dispatch(deleteCategory(categories[0].id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
