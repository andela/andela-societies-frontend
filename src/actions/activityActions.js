import axios from '../helpers/http';
import {
  CREATE_ACTIVITY_REQUEST,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,
} from '../types';
import config from '../../config';

/**
 * Create Activity request action creator
 *
 * @return {Object} {{type: CREATE_ACTIVITY_REQUEST}}
 */
export const createActivityRequest = () => (
  {
    type: CREATE_ACTIVITY_REQUEST,
  }
);

/**
 * Create Activity failure action creator
 *
 * @param {Object} error - Error object containing error information
 * @return {Object} {{type: CREATE_ACTIVITY_FAILURE, error: error}}
 */
export const createActivityFailure = error => (
  {
    type: CREATE_ACTIVITY_FAILURE,
    error,
  }
);

/**
 * Create Activity success action creator
 *
 * @param {Object} activity - object with info on created activity
 * @return {Object} {{type: FETCH_MY_ACTIVITIES_FAILURE, bool: bool}}
 */
export const createActivitySuccess = activity => (
  {
    type: CREATE_ACTIVITY_SUCCESS,
    activity,
  }
);

/**
 * create activity thunk
 * @param {Object} activity object with form data for a logged activity
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const createActivity = activity => (
  (dispatch) => {
    dispatch(createActivityRequest());
    return axios.post(`${config.API_BASE_URL}/logged-activities`, activity)
      .then((response) => {
        dispatch(createActivitySuccess(response.data.data));
      })
      .catch((error) => { dispatch(createActivityFailure(error)); });
  }
);
