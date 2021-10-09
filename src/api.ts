import axios from 'axios';

import { Coordinates } from './types';

const MAX_CONCURRENT_REQUEST = 5;
const BASE_URL = 'https://api.sunrise-sunset.org/json';

const api = axios.create({ baseURL: BASE_URL });

export default async (locations: Array<Coordinates>) => {
  const responses = await Promise.all(
    locations.map((loc) => api.get('', { params: loc }))
  );
  return responses.map(({ data }) => data);
};
