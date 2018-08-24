import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// actions
import {
  editCategory
} from '../../src/actions/editCategoryActions';

// config
import config from '../../config';

import {
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILURE,
} from '../../src/types';

// fixtures
import categories from '../../src/fixtures/categories';

const mockStore = configureMockStore([thunk]);
let store;
const error = new Error('Request failed with status code 400');

describe('Edit Category actions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => moxios.uninstall());

  it('Successfully edit a category', async () => {
    const category = categories[0];
    const updatedCategory = {
      ...category,
      description: 'Interviewing candidates'
    }
    moxios.stubRequest(`${config.API_BASE_URL}/activity-types/${category.id}`, {
      status: 200,
      response: {
        data: {...updatedCategory},
      }
    })
    const expectedAction = [
      { type: EDIT_CATEGORY_REQUEST },
      { type: EDIT_CATEGORY_SUCCESS, category: updatedCategory }
    ]; 
    await store.dispatch(editCategory(updatedCategory));
    expect(store.getActions()).toEqual(expectedAction);

  });
  it('Unsuccessful editing of a category', async () => {
    const category = categories[0];
    moxios.stubRequest(`${config.API_BASE_URL}/activity-types/${category.id}`, {
      status: 400
    })
    const expectedAction = [
      {type: EDIT_CATEGORY_REQUEST},
      {type: EDIT_CATEGORY_FAILURE, error}
    ];

    const updatedCategory = {
      ...category,
      description: 'Interviewing candidates'
    } 
    await store.dispatch(editCategory(updatedCategory));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
