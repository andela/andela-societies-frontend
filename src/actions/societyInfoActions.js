import axios from 'axios';

import {
  GET_SOCIETY_INFO_REQUEST,
  GET_SOCIETY_INFO_SUCCESS,
  GET_SOCIETY_INFO_FAILURE,
} from '../types';
import config from '../../config';

/**
 * @function societyInfoGetRequest
 * @return {Object} {{type: GET_SOCIETY_INFO_REQUEST}}
 */
export const societyInfoGetRequest = () => (
  {
    type: GET_SOCIETY_INFO_REQUEST,
  }
);

/**
 * @function societyInfoGetSuccess
 * @param info - object with society details
 * @return {Object} {{type: GET_SOCIETY_INFO_SUCCESS, info}}
 */
export const societyInfoGetSuccess = info => (
  {
    type: GET_SOCIETY_INFO_SUCCESS,
    info,
  }
);

/**
 * @function societyInfoGetFailure
 * @param error - object with error information
 * @return {Object} {{type: GET_SOCIETY_INFO_FAILURE, error}}
 */
export const societyInfoGetFailure = error => (
  {
    type: GET_SOCIETY_INFO_FAILURE,
    error,
  }
);

/**
 * @function fetchSocietyInfo thunk
 * @param name - society name
 * @returns {(dispatch) => Promise<AxiosResponse>}
 */
export const fetchSocietyInfo = name => (
  (dispatch) => {
    dispatch(societyInfoGetRequest());
    return axios.get(`${config.API_BASE_URL}/societies?name=${name}`)
      .then((response) => {
        dispatch(societyInfoGetSuccess(response.data.societyDetails));
      })
      .catch(error => dispatch(societyInfoGetFailure(error)));
  }
);
