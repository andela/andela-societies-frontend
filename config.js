const configs = {
  production: {
    AUTH_API: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'https://societies.andela.com',
    API_BASE_URL: 'https://societies-api.andela.com/api/v1',
  },
  staging: {
    AUTH_API: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'https://societies-staging.andela.com',
    API_BASE_URL: 'https://societies-api-staging.andela.com/api/v1',
  },
  development: {
    AUTH_API: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'http://soc-dev.andela.com:3000/',
    API_BASE_URL: 'https://private-ae5c2-andelasocietiesapi.apiary-mock.com/api/v1',
  },
  testing: {
    AUTH_API: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'http://soc-dev.andela.com:3000',
    API_BASE_URL: 'https://societies-api-dev.andela.com/api/v1',
  },
};

const config = configs[process.env.NODE_ENV];
export default config;
