import axios from 'axios';
import http from '../helpers/http';

import {
  CREATE_ACTIVITY_FAILURE,
  CREATE_ACTIVITY_REQUEST,
  CREATE_ACTIVITY_SUCCESS,
  FETCH_ALL_ACTIVITIES_FAILURE,
  FETCH_ALL_ACTIVITIES_REQUEST,
  FETCH_ALL_ACTIVITIES_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_OPS_FAILURE,
  VERIFY_ACTIVITY_OPS_REQUEST,
  VERIFY_ACTIVITY_OPS_SUCCESS,
} from '../types';
import config from '../../config';

/**
 * Create Activity request action creator
 *
 * @return {Object} {{type: CREATE_ACTIVITY_REQUEST}}
 */
export const createActivityRequest = () => ({
  type: CREATE_ACTIVITY_REQUEST,
});

/**
 * Create Activity failure action creator
 *
 * @param {Object} error - Error object containing error information
 * @return {Object} {{type: CREATE_ACTIVITY_FAILURE, error: error}}
 */
export const createActivityFailure = error => ({
  type: CREATE_ACTIVITY_FAILURE,
  error,
});

/**
 * Create Activity success action creator
 *
 * @param {Object} activity - object with info on created activity
 * @return {Object} {{type: FETCH_MY_ACTIVITIES_FAILURE, bool: bool}}
 */
export const createActivitySuccess = activity => ({
  type: CREATE_ACTIVITY_SUCCESS,
  activity,
});

/**
 * @function fetchAllActivitiesRequests
 * @return {Object} {{type: FETCH_ALL_ACTIVITIES_REQUEST}}
 */
export const fetchAllActivitiesRequests = () => ({
  type: FETCH_ALL_ACTIVITIES_REQUEST,
});

/**
 * @function fetchAllActivitiesSuccess
 * @param activities - array of fetch all activities
 * @return {Object} {{type: FETCH_ALL_ACTIVITIES_SUCCESS, activities}}
 */
export const fetchAllActivitiesSuccess = activities => ({
  type: FETCH_ALL_ACTIVITIES_SUCCESS,
  activities,
});

/**
 * @function fetchAllActivitiesFailure
 * @param error - object with error information
 * @return {Object} {{type: FETCH_ALL_ACTIVITIES_FAILURE, error}}
 */
export const fetchAllActivitiesFailure = error => ({
  type: FETCH_ALL_ACTIVITIES_FAILURE,
  error,
});

/**
 * @function verifyActivityRequest
 * @return {Object} {{type: VERIFY_ACTIVITY_REQUEST, activity}}
 */
export const verifyActivityRequest = () => ({
  type: VERIFY_ACTIVITY_REQUEST,
});

/**
 * @function verifyActivitySuccess
 * @return {Object} {{type: VERIFY_ACTIVITY_SUCCESS, activity}}
 */
export const verifyActivitySuccess = activity => ({
  type: VERIFY_ACTIVITY_SUCCESS,
  activity,
});

/**
 * @function verifyActivityFailure
 * @param error - object with error information
 * @return {Object} {{type: VERIFY_ACTIVITY_FAILURE, error}}
 */
export const verifyActivityFailure = error => ({
  type: VERIFY_ACTIVITY_FAILURE,
  error,
});

/**
 * @name verifyActivitiesOpsRequest
 * @returns {Object}
 */
export const verifyActivitiesOpsRequest = () => ({
  type: VERIFY_ACTIVITY_OPS_REQUEST,
});

/**
 * @name verifyActivitiesOpsSuccess
 * @param {Array} activities - activities approved
 * @param {Array} activityIds - ids of the activities approved
 */
export const verifyActivitiesOpsSuccess = (activities, activityIds) => ({
  type: VERIFY_ACTIVITY_OPS_SUCCESS,
  activities,
  activityIds,
});

/**
 * @name verifyActivitiesOpsFailure
 * @param {Object} error
 */
export const verifyActivitiesOpsFailure = error => ({
  type: VERIFY_ACTIVITY_OPS_FAILURE,
  error,
});

/**
 * @name verifyActivitiesOps
 * @summary Used to approve multiple activities
 * @param {Array} activityIds - ids of activities to be approved
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const verifyActivitiesOps = activityIds => (dispatch) => {
  dispatch(verifyActivitiesOpsRequest());
  return http
    .put(`${config.API_BASE_URL}/logged-activities/approve/`, { loggedActivitiesIds: activityIds })
    .then((response) => {
      dispatch(verifyActivitiesOpsSuccess(response.data.data, activityIds));
    })
    .catch((error) => {
      dispatch(verifyActivitiesOpsFailure(error));
    });
};

/**
 * create activity thunk
 * @param {Object} activity object with form data for a logged activity
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const createActivity = activity => (dispatch) => {
  dispatch(createActivityRequest());
  return axios
    .post(`${config.API_BASE_URL}/logged-activities`, activity)
    .then((response) => {
      dispatch(createActivitySuccess(response.data.data));
    })
    .catch((error) => {
      dispatch(createActivityFailure(error));
    });
};

/**
 * @function fetchAllActivities thunk
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const fetchAllActivities = () => (dispatch) => {
  dispatch(fetchAllActivitiesRequests());
  return axios
    .get(`${config.API_BASE_URL}/logged-activities?paginate=false`)
    .then((response) => {
      dispatch(fetchAllActivitiesSuccess(response.data.data.loggedActivities));
    })
    .catch(error => dispatch(fetchAllActivitiesFailure(error)));
};

/**
 * @function verifyActivity thunk
 * @summary Used to approve/reject an activity
 * @param {String} clickAction - indicates the action clicked/status
 * @param {String} activityId - id of activity
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const verifyActivity = (clickAction, activityId) => (dispatch) => {
  dispatch(verifyActivityRequest());
  return http
    .put(`${config.API_BASE_URL}/logged-activities/review/${activityId}`, { status: clickAction })
    .then((response) => {
      dispatch(verifyActivitySuccess(response.data.data));
    })
    .catch(error => dispatch(verifyActivityFailure(error)));
};
