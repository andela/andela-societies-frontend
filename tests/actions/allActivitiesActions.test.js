import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// actions
import {
  fetchAllActivitiesRequests,
  fetchAllActivities,
} from '../../src/actions/allActivitiesActions';

// types
import {
  FETCH_ALL_ACTIVITIES_FAILURE,
  FETCH_ALL_ACTIVITIES_SUCCESS,
  FETCH_ALL_ACTIVITIES_REQUEST,
} from '../../src/types';

// helpers
import config from '../../config';

// fixtures
import activities from '../../src/fixtures/activities';

const mockStore = configureMockStore([thunk]);
let store;

describe('All Activities Actions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => moxios.uninstall());

  it('should create all activities action', () => {
    expect(fetchAllActivitiesRequests()).toEqual({ type: FETCH_ALL_ACTIVITIES_REQUEST });
  });

  it('should dispatch FETCH_ALL_ACTIVITIES_SUCCESS on successfull fetching of activities', async () => {
    moxios.stubRequest(`${config.API_BASE_URL}/activities`, {
      status: 200,
      response: {
        data: {
          activities,
        },
      },
    });
    const expectedSuccessAction = { type: FETCH_ALL_ACTIVITIES_SUCCESS, activities };
    await store.dispatch(fetchAllActivities());
    expect(store.getActions()[1]).toEqual(expectedSuccessAction);
  });

  it('should dispatch FETCH_ALL_ACTIVITIES_FAILURE on unsuccessfull fetching of activities', async () => {
    moxios.stubRequest(`${config.API_BASE_URL}/activities`, { status: 400 });
    const expectedFailAction = {
      type: FETCH_ALL_ACTIVITIES_FAILURE,
      error: new Error('Request failed with status code 400', 400),
    };
    await store.dispatch(fetchAllActivities());
    expect(store.getActions()[1]).toEqual(expectedFailAction);
  });
});
