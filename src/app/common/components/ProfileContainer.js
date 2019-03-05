import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { removeCookies } from '../../utils';

class ProfileContainer extends Component {
  static defaultProps = {
    name: '',
    userImage: '',
    className: '',
  };

  static propTypes = {
    name: PropTypes.string,
    userImage: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    showProfile: false,
  };

  /**
   * @name profileIconClick
   * toggles state to show profile dropdown
   */
  profileIconClick = () => {
    this.setState(prevState => ({ showProfile: !prevState.showProfile }));
  };

  /**
   * @name logOut
   * logs out a user
   */
  logOut = () => {
    this.profileIconClick();
    removeCookies('jwt-token');
  };

  render() {
    const { name, userImage, className } = this.props;
    const { showProfile } = this.state;
    return (
      <div className={`profile ${className}`}>
        <div className='profile__content' aria-hidden='true' onClick={this.profileIconClick}>
          <p className='profile__name'>{name}</p>
          <span
            className='profile__image'
            style={{
              backgroundImage: `url(${userImage})`,
            }}
          />
          <i className='fa fa-ellipsis-v fa-lg' />
        </div>
        <div className={showProfile ? 'dropdown-menu show' : 'dropdown-menu'}>
          <p className='profile-dropdown__option--name'>{name}</p>
          <div className='dropdown-divider' />
          <div>
            <span className='fa fa-cog profile-dropdown__icon' />
            <Link to='/dashboard' className='profile-dropdown__option'>
              Profile
            </Link>
          </div>
          <div>
            <span className='fa fa-sign-out profile-dropdown__icon' />
            <Link to='/' aria-hidden='true' className='profile-dropdown__option' onClick={this.logOut}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
