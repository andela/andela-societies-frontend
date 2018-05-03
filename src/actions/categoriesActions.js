import axios from 'axios';

import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../types';
import config from '../../config';

/**
 * @function requestCategories
 * @return {Object} {{type: FETCH_CATEGORIES_REQUEST}}
 */
export const requestCategories = () => (
  {
    type: FETCH_CATEGORIES_REQUEST,
  }
);

/**
 * @function requestCategoriesSuccess
 * @param {Array} categories - array of category objects
 * @return {Object} {{type: FETCH_CATEGORIES_SUCCESS, categories}}
 */
export const requestCategoriesSuccess = categories => (
  {
    type: FETCH_CATEGORIES_SUCCESS,
    categories,
  }
);

/**
 * @function requestCategoriesFailure
 * @param error - object with error information
 * @return {Object} {{type: FETCH_CATEGORIES_FAILURE, error}}
 */
export const requestCategoriesFailure = error => (
  {
    type: FETCH_CATEGORIES_FAILURE,
    error,
  }
);

/**
 * @function fetchCategories thunk
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const fetchCategories = () => (
  (dispatch) => {
    dispatch(requestCategories());
    return axios.get(`${config.API_BASE_URL}/activity-types`)
      .then((response) => {
        dispatch(requestCategoriesSuccess(response.data.data));
      })
      .catch(error => dispatch(requestCategoriesFailure(error)));
  }
);
