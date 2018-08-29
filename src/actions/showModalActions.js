// action types
import {
  OPEN_MODAL_SUCCESS,
  CLOSE_MODAL_SUCCESS,
} from '../types/index';


export const openModal = () => (
  dispatch => (dispatch({ type: OPEN_MODAL_SUCCESS, showModal: true }))
);

export const closeModal = () => (
  dispatch => (dispatch({ type: CLOSE_MODAL_SUCCESS, showModal: false }))
);
