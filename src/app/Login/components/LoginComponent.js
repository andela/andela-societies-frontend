import React from 'react';

import config from '../../../../config';

const LoginComponent = () => (
  <div>
    <div>
      <p>Be part of something big</p>
      <p>
        Track your society activities, log points and see your contributions
      </p>
      <a
        href={`${config.AUTH_API}${config.APP_URL}`}
        className='button--login'
        role='button'
        aria-label='Sign in with Google'
        tabIndex='0'
      >
        <div className='logo--google' />
        <span>
          Sign in with Google
        </span>
      </a>
    </div>
    <div>
      <p> 2018 &copy; Powered by Andela </p>
    </div>
  </div>
);

export default LoginComponent;
