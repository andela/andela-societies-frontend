import axios from 'axios';
// types
import {
  CREATE_REDEEM_POINTS_FAILURE,
  CREATE_REDEEM_POINTS_REQUEST,
  CREATE_REDEEM_POINTS_SUCCESS,
} from '../types';

import config from '../../config';

/**
 * @name createRedeemPointsRequest
 * @summary action creator for create redeem points request
 * @returns {Object} { type: REDEEM_POINTS_REQUEST }
 */
export const createRedeemPointsRequest = () => ({ type: CREATE_REDEEM_POINTS_REQUEST });

/**
 * @name createRedeemPointsFailure
 * @summary action creator for create redeem points failure
 * @param {Object} error - payload error
 * @returns {Object} action
 */
export const createRedeemPointsFailure = error => ({
  type: CREATE_REDEEM_POINTS_FAILURE,
  error,
});

/**
 * @name createRedeemPointsSuccess
 * @summary action creator for create redeem points success
 * @param {Object} redemption - redeemed points payload
 * @returns {Object} action
 */
export const createRedeemPointsSuccess = redemption => ({
  type: CREATE_REDEEM_POINTS_SUCCESS,
  redemption,
});


/**
 * @name redeemPoints
 * @summary thunk to redeem points for an activity
 * @param {Object} redemptionData - data that contains points to redeem
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const redeemPoints = (redemptionData, societyId) => ((dispatch) => {
  dispatch(createRedeemPointsRequest());
  return axios.post(`${config.API_BASE_URL}/societies/redeem/${societyId}`, redemptionData)
    .then(response => (
      dispatch(createRedeemPointsSuccess(response.data))
    )).catch(error => (
      dispatch(createRedeemPointsFailure(error.response.data.message))
    ));
});
