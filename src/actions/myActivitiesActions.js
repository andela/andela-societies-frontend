import axios from 'axios';
import {
  MY_ACTIVITIES_GET_REQUEST,
  MY_ACTIVITIES_GET_SUCCESS,
  MY_ACTIVITIES_GET_FAILURE,
} from './constants';
import config from '../../config';

export const myActivitiesGetRequest = bool => (
  {
    type: MY_ACTIVITIES_GET_REQUEST,
    requesting: bool,
  }
);

export const myActivitiesGetFailure = bool => (
  {
    type: MY_ACTIVITIES_GET_FAILURE,
    failed: bool,
  }
);

export const myActivitiesGetSuccess = activities => (
  {
    type: MY_ACTIVITIES_GET_SUCCESS,
    activities,
  }
);

export const fetchMyActivities = () => (
  (dispatch) => {
    dispatch(myActivitiesGetRequest(true));

    return axios.get(config.API_URL)
      .then((response) => {
        dispatch(myActivitiesGetRequest(false));
        dispatch(myActivitiesGetSuccess(response.data.data));
      })
      .catch(() => dispatch(myActivitiesGetFailure(true)));
  }
);
