import http from '../helpers/http';

import {
  VERIFY_REDEMPTION_SUCCESS,
  VERIFY_REDEMPTION_FAILURE,
  VERIFY_REDEMPTION_REQUEST,
} from '../types';
import config from '../../config';

// constants
import clickActions from '../constants/clickAction';
import { PENDING } from '../constants/statuses';

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
 * @param {Boolean} action - whether request for points redemption is granted
 * @param {String} id - identifier for redemption request
 * @param {String} comment - comment for when a redemption request is rejected
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const verifyRedemption = (id, clickAction, comment = '') => {
  let requestData = { status: clickAction };
  if (comment && clickAction === clickActions.REJECT) {
    requestData.rejection = comment;
  }
  if (clickAction === clickActions.MORE_INFO) {
    requestData = { ...requestData, status: PENDING, comment };
  }

  return (
    (dispatch) => {
      dispatch(verifyRedemptionRequest());
      return http.put(
        `${config.API_BASE_URL}/societies/redeem/${id}`,
        requestData,
      )
        .then((response) => {
          dispatch(verifyRedemptionSuccess(response.data.data));
        })
        .catch(error => dispatch(verifyRedemptionFailure(error)));
    }
  );
};
