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
import { PENDING, REJECTED } from '../constants/statuses';
import clickActions from '../constants/clickAction';

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
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const verifyActivity = (clickAction, activityId) => (
  (dispatch) => {
    dispatch(verifyActivityRequest());
    return http.put(
      `${config.API_BASE_URL}/logged-activities/${activityId}`,
      { status: clickAction === clickActions.APPROVE ? PENDING : REJECTED },
    )
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
 * @param {Array} activities
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
 * @param {Array} activityIds
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const verifyActivitiesOps = activityIds => (
  (dispatch) => {
    dispatch(verifyActivitiesOpsRequest());
    return http.put(
      `${config.API_BASE_URL}/logged-activities`,
      { loggedActivitiesIds: activityIds, status: 'approved' },
    )
      .then((response) => {
        dispatch(verifyActivitiesOpsSuccess(response.data.data, activityIds));
      })
      .catch((error) => {
        dispatch(verifyActivitiesOpsFailure(error));
      });
  }
);
