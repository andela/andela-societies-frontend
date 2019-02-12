import React, { Component } from 'react';
import { LogoComponent, SidebarComponent } from './index';

class NavbarComponent extends Component {
  state = {
    sidebarState: false,
  };

  toggleSidebarState = () => {
    this.setState(prevState => ({ sidebarState: !prevState.sidebarState }));
  }

  render() {
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
        <SidebarComponent
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
          <LogoComponent
            styles='navbar__logo'
            logoClassType='logo__image--white'
          />
        </div>
      </nav>
    );
  }
}

export default NavbarComponent;
