import http from '../helpers/http';

import {
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
  VERIFY_ACTIVITY_OPS_REQUEST,
  VERIFY_ACTIVITY_OPS_FAILURE,
  VERIFY_ACTIVITY_OPS_SUCCESS,
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
 * @name verifyActivitiesOpsRequest
 * @returns {Object}
 */
export const verifyActivitiesOpsRequest = () => (
  {
    type: VERIFY_ACTIVITY_OPS_REQUEST,
  }
);

/**
 * @name verifyActivitiesOpsSuccess
 * @param {Array} activities - activities approved
 * @param {Array} activityIds - ids of the activities approved
 */
export const verifyActivitiesOpsSuccess = (activities, activityIds) => (
  {
    type: VERIFY_ACTIVITY_OPS_SUCCESS,
    activities,
    activityIds,
  }
);

/**
 * @name verifyActivitiesOpsFailure
 * @param {Object} error
 */
export const verifyActivitiesOpsFailure = error => (
  {
    type: VERIFY_ACTIVITY_OPS_FAILURE,
    error,
  }
);

/**
 * @name verifyActivitiesOps
 * @summary Used to approve multiple activities
 * @param {Array} activityIds - ids of activities to be approved
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const verifyActivitiesOps = activityIds => (
  (dispatch) => {
    dispatch(verifyActivitiesOpsRequest());
    return http.put(
      `${config.API_BASE_URL}/logged-activities/approve/`,
      { loggedActivitiesIds: activityIds },
    )
      .then((response) => {
        dispatch(verifyActivitiesOpsSuccess(response.data.data, activityIds));
      })
      .catch((error) => {
        dispatch(verifyActivitiesOpsFailure(error));
      });
  }
);
