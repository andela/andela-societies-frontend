import axios from 'axios';
import { getToken } from './authentication';

axios.defaults.headers.common.Authorization = getToken();

export default axios;
