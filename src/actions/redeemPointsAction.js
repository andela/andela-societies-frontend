import axios from '../helpers/http';

// types
import {
  CREATE_REDEEM_POINTS_FAILURE,
  CREATE_REDEEM_POINTS_REQUEST,
  CREATE_REDEEM_POINTS_SUCCESS,
  FETCH_REDEMPTIONS_REQUEST,
  FETCH_REDEMPTIONS_FAILURE,
  FETCH_REDEMPTIONS_SUCCESS,
  UPDATE_REDEMPTION_REQUEST,
  UPDATE_REDEMPTION_FAILURE,
  UPDATE_REDEMPTION_SUCCESS,
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
export const redeemPoints = redemptionData => ((dispatch) => {
  dispatch(createRedeemPointsRequest());
  return axios.post(`${config.API_BASE_URL}/societies/redeem`, redemptionData)
    .then(response => (
      dispatch(createRedeemPointsSuccess(response.data))
    )).catch(error => (
      dispatch(createRedeemPointsFailure(error.response.data.message))
    ));
});

/*
 * @name fetchRedemptionsRequest
 * @summary action creator for the fetch request
 * @returns {Object} action
 */
export const fetchRedemptionsRequest = () => ({
  type: FETCH_REDEMPTIONS_REQUEST,
});

/**
 * @name fetchRedemptionsSuccess
 * @summary action creator for the fetch success
 * @param {Array} redemptions
 * @returns {Object} action
 */
export const fetchRedemptionsSuccess = redemptions => ({
  type: FETCH_REDEMPTIONS_SUCCESS,
  redemptions,
});

/**
 * @name fetchRedemption
 * @summary thunk for fetching redemptions
 * @param {String} societyId
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const fetchRedemption = (ref) => {
  const path = ref === 'full' ? '' : `?society=${ref}`;
  return (dispatch) => {
    dispatch(fetchRedemptionsRequest());
    return axios.get(`${config.API_BASE_URL}/societies/redeem${path}`)
      .then((response) => {
        dispatch(fetchRedemptionsSuccess(response.data.data));
      }).catch(() => dispatch({ type: FETCH_REDEMPTIONS_FAILURE }));
  };
};

/**
 * @name updateRedemptionRequest
 * @summary action creator for an update redemption request
 * @returns {Object} { type: UPDATE_REDEMPTION_REQUEST }
 */
export const updateRedemptionRequest = () => ({ type: UPDATE_REDEMPTION_REQUEST });

/**
 * @name updateRedemptionFailure
 * @summary action creator for an update redemption request failure
 * @param {Object} error - payload error
 * @returns {Object} action
 */
export const updateRedemptionFailure = error => ({
  type: UPDATE_REDEMPTION_FAILURE,
  error,
});

/**
 * @name updateRedemptionSuccess
 * @summary action creator for an update redemption request success
 * @param {Object} redemption - updated redemption payload
 * @returns {Object} action
 */
export const updateRedemptionSuccess = redemption => ({
  type: UPDATE_REDEMPTION_SUCCESS,
  redemption,
});

/**
 * @name updateRedemption
 * @summary thunk to update a redemption
 * @param {Object} redemption - redemption to be updated payload
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const updateRedemption = redemption => ((dispatch) => {
  const updateData = { ...redemption };
  delete updateData.id;
  dispatch(updateRedemptionRequest());
  return axios.put(`${config.API_BASE_URL}/societies/redeem/${redemption.id}`, updateData)
    .then(response => (
      dispatch(updateRedemptionSuccess(response.data))
    )).catch(error => (
      dispatch(updateRedemptionFailure(error.response.data.message))
    ));
});
