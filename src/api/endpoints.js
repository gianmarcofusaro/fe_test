
const DAILY_BASE = 'photoshoots_daily'
const DETAIL_BASE = 'photoshoots_details'

// const POST = 'POST';
const GET = 'GET';

const APIS = {
  DAILY_APIS: {
    daily: {
      method: GET,
      url: `/${DAILY_BASE}`
    },
  },
  DETAIL_APIS: {
    detail: {
      method: GET,
      url: `/${DETAIL_BASE}`
    }
  }
};

export const {
  DAILY_APIS,
  DETAIL_APIS
} = APIS;