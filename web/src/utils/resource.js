import axios from 'axios';
import { authorization } from '../stores';

const resource = axios.create({
  baseURL: `${process.env.DEV_SERVER_PROXY}/${process.env.API_PATH}/${process.env.API_VERSION}`,
});

resource.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.common.Authorization = authorization.getToken;
    return config;
  },
  error => Promise.reject(error),
);

resource.interceptors.response.use(
  (response) => {
    if (response.status.toString().startsWith('2')) {
      return Promise.resolve(response);
    }
    if (response && response.status === 401) {
      authorization.logout();
    }
    return Promise.reject(response);
  },
);

export default resource;
