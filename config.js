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
    ANDELA_API_BASE_URL: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'http://soc-dev.andela.com:3000/',
    API_URL: 'https://private-e9d067-andelascoietiesapi.apiary-mock.com/api/v1/users/-Kabc/logged-activities',
  },
  testing: {
    AUTH_API: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'http://soc-dev.andela.com:3000',
    API_BASE_URL: 'https://societies-api-dev.andela.com/api/v1',
  },
};

const config = configs[process.env.NODE_ENV];
export default config;
