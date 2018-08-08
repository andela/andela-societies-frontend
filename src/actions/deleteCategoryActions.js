import axios from 'axios';

import {
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from '../types';
import config from '../../config';

/**
 * @function deleteCategoryRequest
 * @return {Object} {{type: DELETE_CATEGORY_REQUEST}}
 */
export const deleteCategoryRequest = () => (
  {
    type: DELETE_CATEGORY_REQUEST,
  }
);

  /**
   * delete Category failure action creator
   * @function deleteCategoryFailure
   * @param {Object} error - Error object with error information
   * @return {Object} {{type: DELETE_CATEGORY_FAILURE, error: error}}
   */
export const deleteCategoryFailure = error => (
  {
    type: DELETE_CATEGORY_FAILURE,
    error,
  }
);

  /**
   * @function deleteCategorySuccess
   * @param {String} category - String ID of deleted category
   * @return {Object} {{type: DELETE_CATEGORY_SUCCESS, bool: bool}}
   */
export const deleteCategorySuccess = id => (
  {
    type: DELETE_CATEGORY_SUCCESS,
    id,
  }
);


/**
 * delete category thunk
 * @param {Object} category_id object with form data for deleted category
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const deleteCategory = categoryId => (
  (dispatch) => {
    dispatch(deleteCategoryRequest());
    return axios.delete(`${config.API_BASE_URL}/activity-types/${categoryId}`)
      .then(() => {
        dispatch(deleteCategorySuccess(categoryId));
      })
      .catch((error) => { dispatch(deleteCategoryFailure(error)); });
  }
);

