import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import Page from './Page';
import Loader from '../components/loaders/Loader';

// helpers
import { hasAllowedRole } from '../helpers/authentication';

// constants
import { ROLES } from '../constants/roles';

class Home extends Component {
  /**
   * @name Home
   * @type {propTypes}
   * @property {Object} history - route history
   * @return React node containing component for displaying the Home page
   */
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    profile: PropTypes.shape({}),
  };

  static defaultProps = {
    history: {},
    profile: {},
  };

  /**
   * @name getDerivedStateFromProps
   * @summary react life cycle to update state with prop values
   * @return {Object} new state values
   */
  static getDerivedStateFromProps = props => ({
    profile: props.profile,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: props.profile,
    };
  }

  /**
   * @name componentDidUpdate
   * @summary check if user roles are present and runs navigate
   */
  componentDidUpdate() {
    const { profile } = this.state;
    if (Object.keys(profile).length) {
      this.navigate(profile);
    }
  }

  /**
   * @name navigate
   * @param {Object} profile - contains user roles
   * @summary navigates user to path depending on user roles
   */
  navigate = (profile) => {
    const { push } = this.props.history;
    const location = sessionStorage.getItem('Location');
    const userRoles = Object.keys(profile.roles);
    if (hasAllowedRole(userRoles, [ROLES[4]])) {
      if (location) {
        push({ pathname: location });
      } else {
        push({ pathname: '/u/verify-activities' });
      }
    } else if (hasAllowedRole(userRoles, [ROLES[5], ROLES[6]])) {
      if (location) {
        push({ pathname: location });
      } else {
        push({ pathname: '/u/redemptions' });
      }
    } else if (hasAllowedRole(userRoles, [ROLES[1]])) {
      if (location) {
        push({ pathname: location });
      } else {
        push({ pathname: '/u/my-activities' });
      }
<<<<<<< HEAD
    } else {
      if (location) {
        push({ pathname: location });
      } else {
        push({ pathname: '/society/istelle' });
      }
=======
>>>>>>> origin/master
    }
  };

  /**
   * @name renderLoader
   * @summary display loader if loading state value is true
   * @returns {React.Node} loader or empty string
   */
  renderLoader = () => {
    let loaderHtml = '';
    if (this.state.loading) {
      loaderHtml = <Loader />;
    }
    return loaderHtml;
  }

  render() {
    return (
      <Page>
        {this.renderLoader()}
      </Page>);
  }
}

const mapStateToProps = state => ({
  profile: state.userProfile.info,
});

export default connect(mapStateToProps, null)(Home);
