import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  myActivitiesGetRequest,
  myActivitiesGetFailure,
  myActivitiesGetSuccess,
  fetchMyActivities,
} from '../../src/actions/myActivitiesActions';
import activities from '../../src/fixtures/activities';
import {
  MY_ACTIVITIES_GET_REQUEST,
  MY_ACTIVITIES_GET_FAILURE,
  MY_ACTIVITIES_GET_SUCCESS,

} from '../../src/actions/constants';

const mockStore = configureMockStore([thunk]);

describe('myActivitiesGetRequest', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to get user activities', () => {
    const expectedAction = {
      type: MY_ACTIVITIES_GET_REQUEST,
      requesting: true,
    };
    expect(myActivitiesGetRequest(true)).toEqual(expectedAction);
  });

  it('should create an action to set error when fetching my activities', () => {
    const expectedAction = {
      type: MY_ACTIVITIES_GET_FAILURE,
      failed: true,
    };
    expect(myActivitiesGetFailure(true)).toEqual(expectedAction);
  });

  it('should create a success action after successfully fetching my activities', () => {
    const expectedAction = {
      type: MY_ACTIVITIES_GET_SUCCESS,
      activities,
    };
    expect(myActivitiesGetSuccess(activities)).toEqual(expectedAction);
  });

  it('dispatches MY_ACTIVITIES_GET_SUCCESS after successfuly fetching activities', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { data: activities },
      });
    });

    const expectedActions = [
      {
        type: MY_ACTIVITIES_GET_REQUEST,
        requesting: true,
      },
      {
        type: MY_ACTIVITIES_GET_REQUEST,
        requesting: false,
      },
      {
        type: MY_ACTIVITIES_GET_SUCCESS,
        activities,
      },
    ];

    const store = mockStore({ myActivities: [] });

    return store.dispatch(fetchMyActivities()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches MY_ACTIVITIES_GET_SUCCESS after successfuly fetching activities', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { data: activities },
      });
    });

    const expectedActions = [
      {
        type: MY_ACTIVITIES_GET_REQUEST,
        requesting: true,
      },
      {
        type: MY_ACTIVITIES_GET_FAILURE,
        failed: true,
      },
    ];

    const store = mockStore({ myActivities: [] });

    return store.dispatch(fetchMyActivities()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
