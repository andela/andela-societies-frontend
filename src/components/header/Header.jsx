import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NotificationIcon from '../svgIcons/headerIcons/Notification';
import NotificationList from './NotificationList';
import ProfileDisplay from './ProfileDisplay';
import Breadcrumb from './Breadcrumb';
import { removeCookies } from '../../helpers/authentication';

/**
 * @name Header
 * @summary Renders the app's Header
 * @extends React.Component
 */
export default class Header extends Component {
  static defaultProps = {
    societyBanner: false,
    profile: null,
  };
  /**
   * @name propTypes
   * @type {PropType}
   * @param {Object} propTypes - React PropTypes
   * @property {Object} history - React router history object
   * @property {Object} pageInfo - Object containing title and url of the current page
   * @property {Object} userInfo - Object containing details about the signed in user
 */
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }).isRequired,
    societyBanner: PropTypes.bool,
    profile: PropTypes.shape({
      society: PropTypes.shape({
        name: PropTypes.string,
      }).isRequired,
    }),
  }
  constructor(props) {
    super(props);
    this.initialMenuState = {
      showNotificationDropdown: false,
      showProfileDropdown: false,
    };
    this.state = {
      menuState: {
        ...this.initialMenuState,
      },
    };
  }
  /**
   * @name dropdownClass
   * @summary Returns the value for className of a dropdown
   * @param {boolean} isActive Whether or not to show the dropdown
   * @param {array[string]} classList Other values for the className
   */
  dropdownClass = (isActive, classList) => (
    `${classList.join(' ')} ${isActive ? 'headerDropdown--active' : ''}`
  );

  /**
   * @name showDropdown
   * @summary Returns an event handler for click or keypress events
   * @param {string} stateKey - The key in the state to alter
   * @returns {function} - Event handler that toggles dropdown on click or on ENTER key press
   */
  showDropdown(stateKey) {
    return (event) => {
      if (event.type === 'keydown' && event.keyCode !== 13) {
        return;
      }
      this.setState(prevState => ({
        menuState: {
          ...this.initialMenuState,
          [stateKey]: !prevState.menuState[stateKey],
        },
      }));
    };
  }
  /**
   * @name logOut
   * @summary Deletes the  cookies and logs a user out
   */
  logOut = () => {
    removeCookies('jwt-token');
    this.props.history.push('/');
  }

  render() {
    const { userInfo, societyBanner, profile } = this.props;
    return (
      <div className={`headerWrapper ${(societyBanner ? ' headerWrapper--white' : '')}`}>
        <div className='leftHeader'>
          <Breadcrumb />
        </div>
        <div className='rightHeader'>
          <div className='headerIcon'>
            <span
              className='headerIcon__image'
              onClick={this.showDropdown('showNotificationDropdown')}
              onKeyDown={this.showDropdown('showNotificationDropdown')}
              role='button'
              tabIndex='0'
            >
              <NotificationIcon />
            </span>
            <span className='headerIcon__badge'>1</span>
            <div className={this.dropdownClass(this.state.menuState.showNotificationDropdown, ['headerDropdown'])}>
              <NotificationList />
            </div>
          </div>
          <div className='headerIcon'>
            <span
              className='headerIcon__image headerIcon__image--photo'
              onClick={this.showDropdown('showProfileDropdown')}
              onKeyDown={this.showDropdown('showProfileDropdown')}
              role='button'
              tabIndex='0'
              style={{
                backgroundImage: `url(${userInfo.picture})`,
              }}
            />
            <div
              className={this.dropdownClass(
                this.state.menuState.showProfileDropdown,
                ['headerDropdown', 'headerDropdown--profile'],
              )}
            >
              <ProfileDisplay userInfo={userInfo} logOut={this.logOut} profile={profile} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
