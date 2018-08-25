import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  createCategoryFailure,
  createCategoryRequest,
  createCategorySuccess,
  createCategory,
} from '../../src/actions/createCategoryActions';
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
} from '../../src/types';
import categories from '../../src/fixtures/categories';
import config from '../../config';

const mockStore = configureMockStore([thunk]);
let store;

describe('Create Category Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to create a category', () => {
    const expectedAction = {
      type: CREATE_CATEGORY_REQUEST,
    };
    expect(createCategoryRequest()).toEqual(expectedAction);
  });

  it('should create an action to set error when delete request fails', () => {
    const expectedAction = {
      type: CREATE_CATEGORY_FAILURE,
      error: { error: 500 },
    };
    expect(createCategoryFailure({ error: 500 })).toEqual(expectedAction);
  });

  it('should create a success action after successfully creating the category', () => {
    const expectedAction = {
      type: CREATE_CATEGORY_SUCCESS,
      category: categories[0],
    };
    expect(createCategorySuccess(categories[0])).toEqual(expectedAction);
  });

  it('dispatches CREATE_CATEGORY_SUCCESS after successfully creating the category', () => {
    store = mockStore({ categories });

    const expectedActions = [
      {
        type: CREATE_CATEGORY_REQUEST,
      },
      {
        type: CREATE_CATEGORY_SUCCESS,
        category: categories[0],
      },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          data: categories[0],
          message: 'Activity type created successfully',
        },
      }).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    moxios.stubRequest(`${config.API_BASE_URL}/activity-types/${categories[0]}`, {
      status: 201,
      response: {
        data: categories[0],
        message: 'Activity type created successfully',
      },
    });

    return store.dispatch(createCategory(categories[0])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
