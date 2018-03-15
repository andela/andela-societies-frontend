import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import VerifyActivitiesIcon from '../components/svgIcons/menuIcons/VerifyActivities';
import RedemptionIcon from '../components/svgIcons/menuIcons/Redemptions';
import SocietiesIcon from '../components/svgIcons/menuIcons/Societies';
import LogActivitiesIcon from '../components/svgIcons/menuIcons/LogActivities';
import config from '../../config';
import { getToken, tokenIsValid, isFellow, setSignInError } from '../helpers/authentication';
import ErrorIcon from '../components/svgIcons/notificationIcons/Error';
import logo from '../assets/images/logos/andelaLogoBlue.png';

const andelaApiBaseUrl = config.ANDELA_API_BASE_URL;
const appUrl = config.APP_URL;

/**
 * @name SignIn
 * @summary Renders the Sign in page
 * @extends React.component
 */
class SignIn extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @param {Object} propTypes - React PropTypes
   * @property {history} items - React router history object
 */
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      signInError: false,
    };
  }

  componentWillMount() {
    // retrieve token from cookie
    const token = getToken();
    if (token && tokenIsValid(token) && isFellow(token)) {
      localStorage.removeItem('signInError');
      this.props.history.push('/my-activities');
    } else {
      localStorage.removeItem('signInError');
      setSignInError();
      // if there is a sign in error go to signin page without error message in url
      this.props.history.push('/');
    }
  }

  render() {
    const error = localStorage.getItem('signInError');
    if (error) {
      this.setState({
        signInError: true,
      });
    }
    return (
      <Fragment>
        <header className='signInHeader'>
          <div className='signInPageContent'>
            <div className='logo'>
              <img className='logo__img' src={logo} alt='Andela logo' />
              <span className='logo__text'>Andela Societies</span>
            </div>
            <a
              href={`${andelaApiBaseUrl} + ${appUrl}`}
              className='signInButton'
              role='button'
              aria-label='Sign in with Google'
              tabIndex='0'
            >
              <div className='signInButton__logo' />
              <span>
                Sign in with Google
              </span>
            </a>
          </div>
        </header>
        <main className='signInPageContent signInPageContent--topAlignment'>
          <div className='signInPageLeftContent'>
            <p className='promo'>
              {'Track your society\'s points as well as your personal contributions to your society.'}
            </p>
            {
              this.state.signInError ?
                <span className='signInError'>
                  <ErrorIcon />
                  <span className='signInError__message'>You must sign in with an Andela account</span>
                </span>
                : null
            }
          </div>
          <div className='signInPageRightContent'>
            <h1 className='featuresTitle'>Features</h1>
            <div className='features'>
              <div className='feature'>
                <div className='feature__icon'>
                  <LogActivitiesIcon />
                </div>
                <div className='feature__info'>
                  <h2 className='feature__name'>Log Activities</h2>
                  <p className='feature__description'>Say goodbye to using spreadsheets for logging activities.</p>
                </div>
              </div>
              <div className='feature'>
                <div className='feature__icon'>
                  <VerifyActivitiesIcon />
                </div>
                <div className='feature__info'>
                  <h2 className='feature__name'>Verify Activities</h2>
                  <p className='feature__description'>
                    Society secretaries and the success department can verify activities.
                  </p>
                </div>
              </div>
              <div className='feature'>
                <div className='feature__icon'>
                  <SocietiesIcon />
                </div>
                <div className='feature__info'>
                  <h2 className='feature__name'>Society Pages</h2>
                  <p className='feature__description'>
                    See how many points societies have, top contributors and much more.
                  </p>
                </div>
              </div>
              <div className='feature'>
                <div className='feature__icon'>
                  <RedemptionIcon />
                </div>
                <div className='feature__info'>
                  <h2 className='feature__name'>Redeem points</h2>
                  <p className='feature__description'>Society presidents can make redemption requests.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default withRouter(SignIn);
