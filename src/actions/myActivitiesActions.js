import axios from '../helpers/http';

import {
  FETCH_MY_ACTIVITIES_REQUEST,
  FETCH_MY_ACTIVITIES_SUCCESS,
  FETCH_MY_ACTIVITIES_FAILURE,
  UPDATE_MY_ACTIVITIES_SUCCESS,
  UPDATE_MY_ACTIVITIES,
  UPDATE_MY_ACTIVITIES_FAILURE,
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
 * @name updateActivitiesRequest
 * @summary action creator for an update myactivities request
 * @param null
 * @return {Object} {{type: UPDATE_MY_ACTIVITIES, bool: bool}}
 */
export const updateActivitiesRequest = () => ({ type: UPDATE_MY_ACTIVITIES });

/**
 * @name updateActivitiesRequestSuccess
 * @summary action creator for an update myactivities request success
 * @param {Object} activity - updated myactivities payload
 * @return {Object} action
 */
export const updateActivitiesRequestSuccess = activity => (
  {
    type: UPDATE_MY_ACTIVITIES_SUCCESS,
    activity,
  }
);

/**
 * @name updateActivitiesRequestFailure
 * @summary action creator for an update myactivities request failure
 * @param {Object} error - payload error
 * @return {Object} action
 */
export const updateActivitiesRequestFailure = error => (
  {
    type: UPDATE_MY_ACTIVITIES_FAILURE,
    error,
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

/**
 * @name updateActivity
 * @summary thunk to update myactivities
 * @param {string} - logged activity id
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const updateActivity = myActivity => ((dispatch) => {
  const updateData = { ...myActivity };
  delete updateData.id;
  dispatch(updateActivitiesRequest());
  return axios.put(`${config.API_BASE_URL}/logged-activities/${myActivity.id}`, updateData)
    .then(response => (
      dispatch(updateActivitiesRequestSuccess(response.data.data))
    )).catch(error => (
      dispatch(updateActivitiesRequestFailure(error.response.data.message))
    ));
});
