import _axios from 'axios';
import { API_URL } from '../config/defaults.json';
import _ from 'lodash';

import { setApiError } from '../store/error/errorSlice';

const unexpectedServerError = "Възникна неочаквана грешка! Моля, опитайте отново по-късно.";
const statusCodes = [400, 401, 403, 404];

export const axiosProtected = ({ dispatch }) => {
  const axios = _axios.create();
  axios.defaults.baseURL = API_URL;
  axios.interceptors.response.use(response => {
    return response
  },
    async error => {
      _.includes(statusCodes, error.response.status) && error.response.data ?
        dispatch(setApiError(error.response.data)) :
        dispatch(setApiError(unexpectedServerError));
    }
  );
  return axios;
};