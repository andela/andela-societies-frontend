const configs = {
  development: {
    ANDELA_API_BASE_URL: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'http://soc-dev.andela.com:3000/',
    API_URL: '',
  },
  production: {
    ANDELA_API_BASE_URL: 'https://api.andela.com/login?redirect_url=',
    APP_URL: 'https://andela-societies.herokuapp.com/',
    API_URL: '',
  },
  testing: {
    ANDELA_API_BASE_URL: 'https://api-staging.andela.com/login?redirect_url=',
    APP_URL: 'http://localhost:3000/',
    API_URL: '',
  },
};

const config = configs[process.env.NODE_ENV];
export default config;
