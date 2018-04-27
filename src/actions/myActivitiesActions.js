import axios from 'axios';

import {
  MY_ACTIVITIES_GET_REQUEST,
  MY_ACTIVITIES_GET_SUCCESS,
  MY_ACTIVITIES_GET_FAILURE,
} from './constants';
import config from '../../config';

/**
 * MyActivities GET request action creator
 *
 * @param {Boolean} bool - boolean indicating whether the request is in progress
 * @return {Object} {{type: MY_ACTIVITIES_GET_REQUEST, bool: bool}}
 */
export const myActivitiesGetRequest = bool => (
  {
    type: MY_ACTIVITIES_GET_REQUEST,
    requesting: bool,
  }
);

/**
 * MyActivities GET request failure action creator
 *
 * @param {Boolean} bool - boolean indicating whether the request failed
 * @return {Object} {{type: MY_ACTIVITIES_GET_FAILURE, bool: bool}}
 */
export const myActivitiesGetFailure = bool => (
  {
    type: MY_ACTIVITIES_GET_FAILURE,
    failed: bool,
  }
);

/**
 * MyActivities GET request success action creator
 *
 * @param {Boolean} activities - array of fetched activities
 * @return {Object} {{type: MY_ACTIVITIES_GET_SUCCESS, activities: activities}}
 */
export const myActivitiesGetSuccess = activities => (
  {
    type: MY_ACTIVITIES_GET_SUCCESS,
    activities,
  }
);

/**
 * fetch myActivities thunk
 *
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const fetchMyActivities = () => (
  (dispatch) => {
    dispatch(myActivitiesGetRequest(true));
    return axios.get(`${config.API_BASE_URL}/users/-Kabc/logged-activities`)
      .then((response) => {
        dispatch(myActivitiesGetRequest(false));
        dispatch(myActivitiesGetSuccess(response.data.data));
      })
      .catch(() => dispatch(myActivitiesGetFailure(true)));
  }
);
