import axios from 'axios';

import {
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILURE,
} from '../types';
import config from '../../config';

/**
 * @name editCategoryRequest
 * @returns {Object} action
 */
export const editCategoryRequest = () => ({
  type: EDIT_CATEGORY_REQUEST,
});

/**
 * @name editCategorySuccess
 * @param {Object} category
 * @returns {Object} action
 */
export const editCategorySuccess = category => ({
  type: EDIT_CATEGORY_SUCCESS,
  category,
});

/**
 * @name editCategoryFailure
 * @returns {Object} action
 */
export const editCategoryFailure = () => ({
  type: EDIT_CATEGORY_FAILURE,
});

/**
 * @name editCategory
 * @param {Object} category
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const editCategory = category => (async (dispatch) => {
  try {
    const updateData = { ...category };
    delete updateData.id;
    dispatch(editCategoryRequest());
    const response = await axios.put(`${config.API_BASE_URL}/activity-types/${category.id}`, updateData);
    dispatch(editCategorySuccess(response.data.data));
    return response.data;
  } catch (error) {
    return dispatch(editCategoryFailure(error));
  }
});
