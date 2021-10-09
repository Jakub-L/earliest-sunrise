import axios from 'axios';
import { Coordinates } from './types';

const BASE_URL = 'https://api.sunrise-sunset.org/json';

const MAX_CONCURRENT_REQUEST = 5;
const REQUEST_RETRY_INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (config) =>
    new Promise((resolve) => {
      const interval = setInterval(() => {
        if (PENDING_REQUESTS < MAX_CONCURRENT_REQUEST) {
          PENDING_REQUESTS += 1;
          clearInterval(interval);
          resolve(config);
        }
      }, REQUEST_RETRY_INTERVAL_MS);
    })
);

api.interceptors.response.use(
  (response) => {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.resolve(response);
  },
  (error) => {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.reject(error);
  }
);

export default async (locations: Array<Coordinates>) => {
  const responses = await Promise.all(
    locations.map((loc) => api.get('', { params: loc }))
  );
  return responses.map(({ data }) => data);
};
