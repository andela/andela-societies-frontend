import React from 'react';
import {
  Route,
  withRouter,
} from 'react-router-dom';

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
          return <Component {...props} />;
        }
        return (
          <div>
            <h1> PLEASE LOGIN. NOT AUTHORIZED </h1>
          </div>
        );
      }
    }
  />
);

export default withRouter(Authenticate);
