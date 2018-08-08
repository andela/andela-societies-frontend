import axios from 'axios';

import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
} from '../types';
import config from '../../config';

/**
 * @function createCategoryRequest
 * @return {Object} {{type: CREATE_CATEGORY_REQUEST}}
 */
export const createCategoryRequest = () => (
  {
    type: CREATE_CATEGORY_REQUEST,
  }
);

  /**
   * Create Category failure action creator
   * @function createCategoryFailure
   * @param {Object} error - Error object with error information
   * @return {Object} {{type: CREATE_CATEGORY_FAILURE, error: error}}
   */
export const createCategoryFailure = error => (
  {
    type: CREATE_CATEGORY_FAILURE,
    error,
  }
);

  /**
   * @function createCategorySuccess
   * @param {Object} category - object with info on created category
   * @return {Object} {{type: CREATE_CATEGORY_SUCCESS, bool: bool}}
   */
export const createCategorySuccess = category => (
  {
    type: CREATE_CATEGORY_SUCCESS,
    category,
  }
);


/**
 * create category thunk
 * @param {Object} category object with form data for created category
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const createCategory = category => (
  (dispatch) => {
    dispatch(createCategoryRequest());
    return axios.post(`${config.API_BASE_URL}/activity-types`, category)
      .then((response) => {
        dispatch(createCategorySuccess(response.data.data));
      })
      .catch((error) => { dispatch(createCategoryFailure(error)); });
  }
);

