import http from '../helpers/http';

import {
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
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
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const verifyActivity = (isApproved, activityId) => (
  (dispatch) => {
    dispatch(verifyActivityRequest());
    return http.put(
      `${config.API_BASE_URL}/logged-activities/${activityId}`,
      { status: isApproved ? 'pending' : 'rejected' },
    )
      .then((response) => {
        dispatch(verifyActivitySuccess(response.data.data));
      })
      .catch(error => dispatch(verifyActivityFailure(error)));
  }
);
