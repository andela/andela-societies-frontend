import React from 'react';
import { render } from 'react-dom';

import { App } from './App';
import './assets/scss/style.scss';

const { NODE_ENV } = process.env;

const mount = (Component) => {
  render(
    <div>
      <Component />
    </div>
    , document.getElementById('root'),
  );
};

mount(App);


if (module.hot && NODE_ENV !== 'development') {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const HotApp = require('./App').default;
    mount(HotApp);
  });
}
