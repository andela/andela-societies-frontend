import config from '../../../config';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300 ) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export const get = async (path) => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/${path}`, { headers });
    const valid = checkStatus(response);
    const result = await valid.json();
    return result; 
  } catch (error) {
    throw error;
  }
}