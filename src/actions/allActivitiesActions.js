import axios from 'axios';

import {
  FETCH_ALL_ACTIVITIES_FAILURE,
  FETCH_ALL_ACTIVITIES_SUCCESS,
  FETCH_ALL_ACTIVITIES_REQUEST,
} from '../types';
import config from '../../config';

/**
 * @function fetchAllActivitiesRequests
 * @return {Object} {{type: FETCH_ALL_ACTIVITIES_REQUEST}}
 */
export const fetchAllActivitiesRequests = () => (
  {
    type: FETCH_ALL_ACTIVITIES_REQUEST,
  }
);

/**
 * @function fetchAllActivitiesSuccess
 * @param activities - array of fetch all activities
 * @return {Object} {{type: FETCH_ALL_ACTIVITIES_SUCCESS, activities}}
 */
export const fetchAllActivitiesSuccess = activities => (
  {
    type: FETCH_ALL_ACTIVITIES_SUCCESS,
    activities,
  }
);

/**
 * @function fetchAllActivitiesFailure
 * @param error - object with error information
 * @return {Object} {{type: FETCH_ALL_ACTIVITIES_FAILURE, error}}
 */
export const fetchAllActivitiesFailure = error => (
  {
    type: FETCH_ALL_ACTIVITIES_FAILURE,
    error,
  }
);

/**
 * @function fetchAllActivities thunk
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const fetchAllActivities = () => (
  (dispatch) => {
    dispatch(fetchAllActivitiesRequests());
    return axios.get(`${config.API_BASE_URL}/activities`)
      .then((response) => {
        dispatch(fetchAllActivitiesSuccess(response.data.data.activities));
      })
      .catch(error => dispatch(fetchAllActivitiesFailure(error)));
  }
);
