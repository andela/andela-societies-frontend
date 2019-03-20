import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LogoComponent from './LogoComponent';
import SidebarContainer from '../../Sidebar/components';
import ProfileContainer from './ProfileContainer';

class NavbarContainer extends Component {
  static defaultProps = {
    userInfo: {
      name: '',
      picture: '',
    },
  };

  static propTypes = {
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }),
  };

  state = {
    sidebarState: false,
  };

  toggleSidebarState = () => {
    this.setState(prevState => ({ sidebarState: !prevState.sidebarState }));
  };

  render() {
    const {
      userInfo: { name, picture },
    } = this.props;
    const { sidebarState } = this.state;
    return (
      <nav className='navbar navbar-light'>
        <form className='form-inline'>
          <div className='input-group input-group-merge'>
            <input
              type='search'
              aria-label='Search'
              placeholder='Search ...'
              className='form-control form-control-search'
            />
            <div className='input-group-append '>
              <span className='input-group-text fa fa-search input-group-icon' id='basic-addon1' />
            </div>
          </div>
        </form>
        <ProfileContainer className='desktop-profile' name={name} userImage={picture} />
        <SidebarContainer
          toggleSidebarState={this.toggleSidebarState}
          className={sidebarState ? 'mobile-sidenav open' : 'mobile-sidenav close'}
        />
        <div className='navbar__actions'>
          <i
            tabIndex={0}
            role='button'
            data-toggle='collapse'
            data-target='#menu-content'
            onClick={this.toggleSidebarState}
            onKeyPress={this.toggleSidebarState}
            className='fa fa-bars fa-2x toggle-btn'
          />
          <LogoComponent styles='navbar__logo' logoClassType='logo__image--white' />
          <ProfileContainer className='mobile-profile' name={name} userImage={picture} />
        </div>
      </nav>
    );
  }
}

export default NavbarContainer;
