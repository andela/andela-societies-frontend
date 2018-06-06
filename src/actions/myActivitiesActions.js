import axios from '../helpers/http';

import {
  FETCH_MY_ACTIVITIES_REQUEST,
  FETCH_MY_ACTIVITIES_SUCCESS,
  FETCH_MY_ACTIVITIES_FAILURE,
} from '../types';
import config from '../../config';

/**
 * MyActivities GET request action creator
 *
 * @param {Boolean} bool - boolean indicating whether the request is in progress
 * @return {Object} {{type: FETCH_MY_ACTIVITIES_REQUEST, bool: bool}}
 */
export const myActivitiesGetRequest = () => (
  {
    type: FETCH_MY_ACTIVITIES_REQUEST,
  }
);

/**
 * MyActivities GET request failure action creator
 *
 * @param {Boolean} bool - boolean indicating whether the request failed
 * @return {Object} {{type: FETCH_MY_ACTIVITIES_FAILURE, bool: bool}}
 */
export const myActivitiesGetFailure = error => (
  {
    type: FETCH_MY_ACTIVITIES_FAILURE,
    error,
  }
);

/**
 * MyActivities GET request success action creator
 *
 * @param {Boolean} activities - array of fetched activities
 * @return {Object} {{type: FETCH_MY_ACTIVITIES_SUCCESS, activities: activities}}
 */
export const myActivitiesGetSuccess = activities => (
  {
    type: FETCH_MY_ACTIVITIES_SUCCESS,
    activities,
  }
);

/**
 * fetch myActivities thunk
 * @param {string} - user id
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const fetchMyActivities = userId => (
  (dispatch) => {
    dispatch(myActivitiesGetRequest());
    return axios.get(`${config.API_BASE_URL}/users/${userId}/logged-activities`)
      .then((response) => {
        dispatch(myActivitiesGetSuccess(response.data.data));
      })
      .catch((error) => { dispatch(myActivitiesGetFailure(error)); });
  }
);
