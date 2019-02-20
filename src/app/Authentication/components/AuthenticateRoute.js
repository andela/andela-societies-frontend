import React from 'react';
import {
  Route,
  withRouter,
} from 'react-router-dom';

import {
  HeroComponent,
  NavbarComponent,
  SidebarComponent,
} from '../../common/components';
import LoginComponent from '../../Login/components';


/**
 * @name _Authenticate
 * Authenticates routes. If not authenticated returns a message
 * @param {Component} component
 * @param {Boolean} isAuthenticated
 */
export const Authenticate = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => {
        if (isAuthenticated) {
          return (
            <div className='wrapper'>
              <HeroComponent />
              <div className='main-content'>
                <SidebarComponent className='sidebar' />
                <div className='sub-content'>
                  <NavbarComponent />
                  <Component {...props} />
                </div>
              </div>
            </div>
          );
        }
        return (<LoginComponent />);
      }
    }
  />
);

export default withRouter(Authenticate);
