import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LogoComponent } from '../../common/components';
import config from '../../../../config';
import tokenIsValid from '../../utils';

class LoginComponent extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @property {Object} history - React router history object
   */
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }

  /**
   * @name defaultProps
   * @type {PropType}
   * @property {Boolean} requesting - state of get request
  */
  static defaultProps = {
    history: {
      push: null,
    },
  };

  componentDidMount() {
    const { history } = this.props;
    if (tokenIsValid()) {
      localStorage.removeItem('signInError');
      history.push('/home');
    } else {
      localStorage.setItem('signInError', 'error');
      history.push('/');
    }
  }

  render() {
    return (
      <div className='login--wrapper container'>
        <div className='login row'>
          <section className='login__pane--left col-12 col-md-7 col-lg-6'>
            <LogoComponent logoClassType='logo__image--blue' />
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
          <section className='login__pane--right col-md-5 col-lg-6' />
        </div>
      </div>
    );
  }
}

export default LoginComponent;
