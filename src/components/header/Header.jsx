import React, { Component } from 'react';

import NotificationIcon from '../svgIcons/headerIcons/Notification';
import NotificationList from './NotificationList';
import ProfileDisplay from './ProfileDisplay';
import Breadcrumb from './Breadcrumb';

/**
 * @name Header
 * @summary Renders the app's Header
 * @extends React.Component
 */
export default class Header extends Component {
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

  render() {
    return (
      <div className='headerWrapper'>
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
<<<<<<< HEAD
            <div className={this.dropdownClass(this.state.menuState.showNotificationDropdown, ['headerDropdown'])}>
=======
            <div className={this.dropdownClass(this.state.showNotificationDropdown, ['headerDropdown'])}>
>>>>>>> e46233c233c1fbde51a1ed12da4c46dfa825e925
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
                backgroundImage: 'url(https://lh3.googleusercontent.com' +
                  '/-00tV67VPUTc/AAAAAAAAAAI/AAAAAAAAAAc/unX3ycsnwTY/photo.jpg?sz=50)',
              }}
            />
            <div
              className={this.dropdownClass(
<<<<<<< HEAD
                this.state.menuState.showProfileDropdown,
=======
                this.state.showProfileDropdown,
>>>>>>> e46233c233c1fbde51a1ed12da4c46dfa825e925
                ['headerDropdown', 'headerDropdown--profile'],
              )}
            >
              <ProfileDisplay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
