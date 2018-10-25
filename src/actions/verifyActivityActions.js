import http from '../helpers/http';

import {
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
  APPROVE_ACTIVITY_BY_OPS_FAILURE,
  APPROVE_ACTIVITY_BY_OPS_REQUEST,
  APPROVE_ACTIVITY_BY_OPS_SUCCESS,
  REJECT_ACTIVITY_BY_OPS_FAILURE,
  REJECT_ACTIVITY_BY_OPS_REQUEST,
  REJECT_ACTIVITY_BY_OPS_SUCCESS,
} from '../types';
import config from '../../config';

/**
 * @function verifyActivityRequest
 * @return {Object} {{type: VERIFY_ACTIVITY_REQUEST, activity}}
 */
export const verifyActivityRequest = () => (
  {
    type: VERIFY_ACTIVITY_REQUEST,
  }
);

/**
 * @function verifyActivitySuccess
 * @return {Object} {{type: VERIFY_ACTIVITY_SUCCESS, activity}}
 */
export const verifyActivitySuccess = activity => (
  {
    type: VERIFY_ACTIVITY_SUCCESS,
    activity,
  }
);

/**
 * @function verifyActivityFailure
 * @param error - object with error information
 * @return {Object} {{type: VERIFY_ACTIVITY_FAILURE, error}}
 */
export const verifyActivityFailure = error => (
  {
    type: VERIFY_ACTIVITY_FAILURE,
    error,
  }
);

/**
 * @function verifyActivity thunk
 * @summary Used to approve/reject an activity
 * @param {String} clickAction - indicates the action clicked/status
 * @param {String} activityId - id of activity
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const verifyActivity = (clickAction, activityId) => (
  (dispatch) => {
    dispatch(verifyActivityRequest());
    return http.put(`${config.API_BASE_URL}/logged-activities/review/${activityId}`, { status: clickAction })
      .then((response) => {
        dispatch(verifyActivitySuccess(response.data.data));
      })
      .catch(error => dispatch(verifyActivityFailure(error)));
  }
);

/**
 * @name approveActivityByOpsRequest
 * @returns {Object}
 */
export const approveActivityByOpsRequest = () => (
  {
    type: APPROVE_ACTIVITY_BY_OPS_REQUEST,
  }
);

/**
 * @name approveActivityByOpsSuccess
 * @param {Array} activities - activities approved
 * @param {Array} activityIds - ids of the activities approved
 */
export const approveActivityByOpsSuccess = (activities, activityIds) => (
  {
    type: APPROVE_ACTIVITY_BY_OPS_SUCCESS,
    activities,
    activityIds,
  }
);

/**
 * @name approveActivityByOpsFailure
 * @param {Object} error
 */
export const approveActivityByOpsFailure = error => (
  {
    type: APPROVE_ACTIVITY_BY_OPS_FAILURE,
    error,
  }
);

/**
 * @name approveActivityByOps
 * @summary Used to approve multiple activities
 * @param {Array} activityIds - ids of activities to be approved
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const approveActivityByOps = activityIds => (
  (dispatch) => {
    dispatch(approveActivityByOpsRequest());
    return http.put(
      `${config.API_BASE_URL}/logged-activities/approve/`,
      { loggedActivitiesIds: activityIds },
    )
      .then((response) => {
        dispatch(approveActivityByOpsSuccess(response.data.data, activityIds));
      })
      .catch((error) => {
        dispatch(approveActivityByOpsFailure(error));
      });
  }
);

/**
 * @name rejectActivityByOpsRequest
 * @returns {Object}
 */
export const rejectActivityByOpsRequest = () => (
  {
    type: REJECT_ACTIVITY_BY_OPS_REQUEST,
  }
);

/**
 * @name rejectActivityByOpsSuccess
 * @param {Array} activity - activity rejected
 */
export const rejectActivityByOpsSuccess = activity => (
  {
    type: REJECT_ACTIVITY_BY_OPS_SUCCESS,
    activity,
  }
);

/**
 * @name rejectActivityByOpsFailure
 * @param {Object} error
 */
export const rejectActivityByOpsFailure = error => (
  {
    type: REJECT_ACTIVITY_BY_OPS_FAILURE,
    error,
  }
);

/**
 * @name rejectActivityByOps
 * @summary Used to reject an activity
 * @param {Array} clickAction - status of the activity
 * @param {String} activityId - id of activity
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const rejectActivityByOps = (clickAction, activityId) => (
  (dispatch) => {
    dispatch(rejectActivityByOpsRequest());
    return http.put(`${config.API_BASE_URL}/logged-activities/reject/${activityId}`, { status: clickAction })
      .then((response) => {
        dispatch(rejectActivityByOpsSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(rejectActivityByOpsFailure(error));
      });
  }
);
