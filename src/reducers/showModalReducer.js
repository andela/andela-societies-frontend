import initialState from './initialState';
import {
  OPEN_MODAL_SUCCESS,
  CLOSE_MODAL_SUCCESS,
} from '../types';

const showModalReducer = (state = initialState.showModal, action) => {
  switch (action.type) {
  case OPEN_MODAL_SUCCESS:
    return {
      ...state,
      showModal: true,
    };
  case CLOSE_MODAL_SUCCESS:
    return {
      ...state,
      showModal: false,
    };
  default:
    return state;
  }
};

export default showModalReducer;
