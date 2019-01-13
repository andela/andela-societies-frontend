import React from 'react';

import config from '../../../../config';

const LoginComponent = () => (
  <div className='login--wrapper'>
    <div className='login'>
      <section className='login__pane--left'>
        <div className='login__pane__title'>
          <div className='login__pane__title--image' />
          <p className='login__pane__title--text'>Societies</p>
        </div>
        <div className='login__pane__description'>
          <p className='login__pane__description--title'>Be part of something big.</p>
          <p className='login__pane_description--content'>
            Track your society activities, log points and see your contributions
          </p>
          <a
            href={`${config.AUTH_API}${config.APP_URL}`}
            className='login__pane_description--button'
            role='button'
            aria-label='Sign in with Google'
            tabIndex='0'
          >
            <div className='login__logo' />
            <div className='login__button_text'>
              LOGIN WITH GOOGLE
            </div>
          </a>
        </div>
        <p className='login__pane__footer'> 2018 &copy; Powered by Andela </p>
      </section>
      <section className='login__pane--right'>
        <p> Image here</p>
      </section>
    </div>
  </div>
);

export default LoginComponent;
