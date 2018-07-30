import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// actions
import { requestMoreInfo } from '../../src/actions/commentActions';

// types
import {
  MORE_INFO_FAILURE,
  MORE_INFO_REQUEST,
  MORE_INFO_SUCCESS,
} from '../../src/types';

// fixtures
import comment from '../../src/fixtures/comments';

// config
import config from '../../config';

const mockStore = configureMockStore([thunk]);
let store;

describe('Comment Actions tests', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => moxios.uninstall());

  it('should dispatch MORE_INFO_REQUEST and MORE_INFO_SUCCESS', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/comments`, {
      status: 200,
      response: {
        data: comment,
        message: 'Successfully submitted your comment',
      },
    });
    const expectedActions = [
      { type: MORE_INFO_REQUEST },
      {
        type: MORE_INFO_SUCCESS,
        comment: {
          data: { ...comment },
          message: 'Successfully submitted your comment',
        },
      },
    ];
    return store.dispatch(requestMoreInfo('opfad176-56cd-11h8-b3b9-9801a7ae0329', 'Explain further'))
      .then(() => (expect(store.getActions()).toEqual(expectedActions)));
  });

  it('should dispatch MORE_INFO_REQUEST and MORE_INFO_FAILURE', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/comments`, {
      status: 400,
      response: {},
    });

    const expectedActions = [
      {
        type: MORE_INFO_REQUEST,
      },
      {
        type: MORE_INFO_FAILURE,
        error: new Error('Request failed with status code 400'),
      },
    ];

    return store.dispatch(requestMoreInfo('opfad176-56cd-11h8-b3b9-9801a7ae0329', 'Explain further'))
      .then(() => (expect(store.getActions()).toEqual(expectedActions)));
  });
});
