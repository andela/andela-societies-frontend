import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// types
import { OPEN_MODAL_SUCCESS, CLOSE_MODAL_SUCCESS } from '../../src/types/index';

// actions
import { openModal, closeModal } from '../../src/actions/showModalActions';

const mockStore = configureMockStore([thunk]);
let store;
let expectedAction;

describe('ShowModal Actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });

  it('should create open modal action', async () => {
    expectedAction = {
      type: OPEN_MODAL_SUCCESS,
      showModal: true
    };
    await store.dispatch(openModal());
    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it('should create close modal action', async () => {
    expectedAction = {
      type: CLOSE_MODAL_SUCCESS,
      showModal: false
    };
    await store.dispatch(closeModal());
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
