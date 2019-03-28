import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import LoginComponent from '../../Login/components';
import SidebarContainer from '../../Sidebar/components';
import { HeroComponent, NavbarContainer } from '../../common/components';

/**
 * @name _Authenticate
 * Authenticates routes. If not authenticated returns a message
 * @param {Component} component
 * @param {Boolean} isAuthenticated
 */
export const Authenticate = ({
  component: Component, isAuthenticated, userInfo, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated) {
        return (
          <div className='wrapper'>
            <HeroComponent />
            <div className='main-content'>
              <SidebarContainer className='sidebar' userId={userInfo.id} />
              <div className='sub-content'>
                <NavbarContainer userInfo={userInfo} />
                <Component {...props} />
              </div>
            </div>
          </div>
        );
      }
      return <LoginComponent />;
    }}
  />
);

export default withRouter(Authenticate);
