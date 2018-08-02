import http from '../helpers/http';

import {
  VERIFY_REDEMPTION_SUCCESS,
  VERIFY_REDEMPTION_FAILURE,
  VERIFY_REDEMPTION_REQUEST,
} from '../types';
import config from '../../config';

/**
 * @function verifyRedemptionRequest
 * @return {Object} {{type: VERIFY_REDEMPTION_REQUEST}}
 */
export const verifyRedemptionRequest = () => (
  {
    type: VERIFY_REDEMPTION_REQUEST,
  }
);

/**
 * @function verifyRedemptionSuccess
 * @return {Object} {{type: VERIFY_REDEMPTION_SUCCESS, redemption}}
 */
export const verifyRedemptionSuccess = redemption => (
  {
    type: VERIFY_REDEMPTION_SUCCESS,
    redemption,
  }
);

/**
 * @function verifyRedemptionFailure
 * @param error - object with error information
 * @return {Object} {{type: VERIFY_REDEMPTION_FAILURE, error}}
 */
export const verifyRedemptionFailure = error => (
  {
    type: VERIFY_REDEMPTION_FAILURE,
    error,
  }
);

/**
 * @function verifyRedemption thunk
 * @param {Boolean} clickAction - click action/status of redemption i.e. approved/rejected
 * @param {String} id - identifier for redemption request
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const verifyRedemption = (id, clickAction) => (
  (dispatch) => {
    dispatch(verifyRedemptionRequest());
    return http.put(`${config.API_BASE_URL}/societies/redeem/verify/${id}`, { status: clickAction })
      .then((response) => {
        dispatch(verifyRedemptionSuccess(response.data.data));
      })
      .catch(error => dispatch(verifyRedemptionFailure(error)));
  }
);
