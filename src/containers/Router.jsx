import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Signin from '../containers/SignIn';
import pageInfo from '../helpers/pageInfo';
import PrivateRoute from '../components/routes/PrivateRoute';

/**
 * @name Router
 * @summary Renders the application routes
 * @return {jsx} React node for the application routes
 */
const pages = [...pageInfo.pages, ...pageInfo.societyPages];

const Router = ({ profile }) => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Signin} />
      {
        pages.map(pageInfoData => (
          pageInfoData.allowedRoles ?
            <PrivateRoute
              path={pageInfoData.url}
              exact
              component={pageInfoData.component}
              key={pageInfoData.title}
              allowedRoles={pageInfoData.allowedRoles}
              userRoles={profile.roles && Object.keys(profile.roles)}
            />
            :
            <Route
              path={pageInfoData.url}
              exact
              component={pageInfoData.component}
              key={pageInfoData.title}
            />
        ))
      }
    </Switch>
  </BrowserRouter>);

const mapStateToProps = state => ({
  profile: state.userProfile.info,
}
);

Router.propTypes = {
  profile: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Router);
