// initial state
import initialState from '../../src/reducers/initialState';

// types
import { OPEN_MODAL_SUCCESS, CLOSE_MODAL_SUCCESS } from '../../src/types';

// reducer
import showModalReducer from '../../src/reducers/showModalReducer';

const defaultState = initialState.showModal;
let expectedState;
describe('ShowModal reducer', () => {
  it('should return the default state when no action has been provided', () => {
    expect(showModalReducer(defaultState, {})).toEqual(defaultState);
  });

  it('should return showModal true when OPEN_MODAL_SUCCESS action is provided', () => {
    expectedState = { showModal: true};
    expect(showModalReducer(defaultState, { type: OPEN_MODAL_SUCCESS, showModal: true })).toEqual(expectedState);
  })

  it('should return showModal false when CLOSE_MODAL_SUCCESS action is provided', () => {
    expectedState = { showModal: false};
    expect(showModalReducer(defaultState, { type: CLOSE_MODAL_SUCCESS, showModal: false })).toEqual(expectedState);
  })
});
