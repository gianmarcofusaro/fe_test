import { get, post } from '../helpers/axiosConfig';
import {
  DAILY_APIS,
  DETAIL_APIS
} from './endpoints';

const METHODS = {
  GET(endpoint, data) {
    return get(endpoint, data);
  },
  POST(endpoint, data) {
    return post(endpoint, data);
  }
};

const GENERIC_FUNCTIONS = {
  PHOTOSHOOT_DAILY: {
    daily: data => METHODS[DAILY_APIS.daily.method](DAILY_APIS.daily.url, data),
  },
  PHOTOSHOOT_DETAIL: {
    detail: data => METHODS[DAILY_APIS.detail.method](DETAIL_APIS.detail.url, data),
  },
};

export const {
  PHOTOSHOOT_DAILY,
  PHOTOSHOOT_DETAIL,
} = GENERIC_FUNCTIONS;