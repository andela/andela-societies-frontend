// helpers
import http from '../helpers/http';

// types
import {
  MORE_INFO_FAILURE,
  MORE_INFO_SUCCESS,
  MORE_INFO_REQUEST,
} from '../types';

// config
import config from '../../config';

/**
 * @function moreInfoRequest
 * @summary action creator for a more info request
 */
export const moreInfoRequest = () => ({ type: MORE_INFO_REQUEST });

/**
 * @function moreInfoFailure
 * @param {} error
 * @summary action creator for a more info failure
 */
export const moreInfoFailure = error => (
  {
    type: MORE_INFO_FAILURE,
    error,
  }
);

/**
 * @function moreInfoSuccess
 * @param {Object} comment
 * @summary action creator for a more info success
 */
export const moreInfoSuccess = comment => (
  {
    type: MORE_INFO_SUCCESS,
    comment,
  }
);

export const requestMoreInfo = (id, comment) => (
  (dispatch) => {
    const commentData = {
      commentedFor: id,
      comment,
    };
    dispatch(moreInfoRequest());
    return http.post(`${config.API_BASE_URL}/comments`, commentData)
      .then((response) => {
        dispatch(moreInfoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(moreInfoFailure(error));
      });
  }
);
