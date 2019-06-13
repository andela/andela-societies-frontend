const configs = {
  production: {
    AUTH_API: 'https://api-prod.andela.com/login?redirect_url=',
    APP_URL: 'https://societies.andela.com',
    API_BASE_URL: 'https://api-staging-societies.andela.com/api/v1',
  },
  staging: {
    AUTH_API: 'https://api-prod.andela.com/login?redirect_url=',
    APP_URL: 'https://staging-societies.andela.com',
    API_BASE_URL: 'https://api-staging-societies.andela.com/api/v1',
  },
  development: {
    AUTH_API: 'https://api-prod.andela.com/login?redirect_url=',
    APP_URL: 'http://soc-dev.andela.com:3000/',
    API_BASE_URL: 'https://private-ae5c2-andelasocietiesapi.apiary-mock.com/api/v1',
  },
  testing: {
    AUTH_API: 'https://api-prod.andela.com/login?redirect_url=',
    APP_URL: 'http://soc-dev.andela.com:3000',
    API_BASE_URL: 'https://societies-api-dev.andela.com/api/v1',
  },
  sandbox: {
    AUTH_API: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'http://soc-sandbox.andela.com:4021',
    API_BASE_URL: 'http://api-soc-sandbox.andela.com:4022/api/v1',
  },
  staging_v2: {
    AUTH_API: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'https://staging-v2-societies.andela.com',
    API_BASE_URL: 'https://api-staging-societies.andela.com/api/v1',
  },
  production_v2: {
    AUTH_API: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'https://societies-v2.andela.com',
    API_BASE_URL: 'https://societies-api-v2.andela.com/api/v1',
  },
};

const config = configs[process.env.NODE_ENV];
export default config;

// Uncomment and use this line after API Staging 2 has been fixed 100%
// API_BASE_URL: 'https://api-staging-v2-societies.andela.com/api/v1'
// Uncomment and use this line after Production has been fixed 100%
// API_BASE_URL: 'https://societies-api.andela.com/api/v1
