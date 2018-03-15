import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

<<<<<<< HEAD
<<<<<<< HEAD
import store from './store';
=======
>>>>>>> Refactor code to adhere to the rules in the description
=======
import store from './store';
>>>>>>> FAB Element at the bottom of the page
import Router from './containers/Router';
import './assets/scss/style.scss';

const { NODE_ENV } = process.env;

const mount = (Component) => {
  render(
<<<<<<< HEAD
<<<<<<< HEAD
    <Provider store={store}>
      <Component />
    </Provider>,
=======
    <Component />,
>>>>>>> Refactor code to adhere to the rules in the description
=======
    <Provider store={store}>
      <Component />
    </Provider>,
>>>>>>> FAB Element at the bottom of the page
    document.getElementById('root'),
  );
};

mount(Router);

if (module.hot && NODE_ENV !== 'development') {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line global-require
    const HotApp = require('./components/App').default;
    mount(HotApp);
  });
}
