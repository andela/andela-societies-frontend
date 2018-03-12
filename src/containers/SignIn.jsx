import React, { Component, Fragment } from 'react';

import VerifyActivitiesIcon from '../components/svgIcons/menuIcons/VerifyActivities';
import RedemptionIcon from '../components/svgIcons/menuIcons/Redemptions';
import SocietiesIcon from '../components/svgIcons/menuIcons/Societies';
import LogActivitiesIcon from '../components/svgIcons/menuIcons/LogActivities';

import logo from '../assets/images/logos/andelaLogoBlue.png';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <header className='signInHeader'>
          <div className='signInPageContent'>
            <div className='logo'>
              <img className='logo__img' src={logo} alt='Andela logo' />
              <span className='logo__text'>Andela Societies</span>
            </div>
            <div
              className='signInButton'
              role='button'
              aria-label='Sign in with Google'
              tabIndex='0'
            >
              <div className='signInButton__logo' />
              <span className='signInButton__label'>
                Sign in with Google
              </span>
            </div>
          </div>
        </header>
        <main className='signInPageContent signInPageContent--topAlignment'>
          <div className='signInPageLeftContent'>
            <p className='promo'>
              {'Track your society\'s points as well as your personal contributions to your society.'}
            </p>
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
<<<<<<< HEAD
                  <p className='feature__description'>
                    Society secretaries and the success department can verify activities.
                  </p>
=======
                  <p className='feature__description'>Society secretaries and the success department can verify activities.</p>
>>>>>>> e46233c233c1fbde51a1ed12da4c46dfa825e925
                </div>
              </div>
              <div className='feature'>
                <div className='feature__icon'>
                  <SocietiesIcon />
                </div>
                <div className='feature__info'>
                  <h2 className='feature__name'>Society Pages</h2>
<<<<<<< HEAD
                  <p className='feature__description'>
                    See how many points societies have, top contributors and much more.
                  </p>
=======
                  <p className='feature__description'>See how many points societies have, top contributors and much more.</p>
>>>>>>> e46233c233c1fbde51a1ed12da4c46dfa825e925
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

export default SignIn;
