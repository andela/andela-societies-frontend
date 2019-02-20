import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  HeroComponent, NavbarComponent, SidebarComponent, ButtonComponent,
} from '../../common/components';
import MyStatsComponent from './MyStatsComponent';
import SocietyStatsComponent from './SocietyStatsComponent';

import { actions } from '../operations';
import { getUserInfo, getToken } from '../../utils/tokenIsValid';

export class DashboardComponent extends Component {
  state = {
    user: {},
  };

  /**
   * @name defaultProps
   * @type {PropType}
   * @property {func} fetchUserActivites
   *
   */
  static defaultProps = {
    error: {},
    loading: false,
    pointsEarned: 0,
    activitiesLogged: 0,
    fetchUserActivites: () => {},
  };

  /**
   * @name propTypes
   * @type {PropType}
   * @property {func} fetchUserActivites
   *
   */
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.shape({}),
    pointsEarned: PropTypes.number,
    activitiesLogged: PropTypes.number,
    fetchUserActivites: PropTypes.func,
  };

  componentDidMount() {
    const { fetchUserActivites } = this.props;
    const token = getToken();
    const userInfo = getUserInfo(token);
    this.setState({ user: userInfo });
    fetchUserActivites(userInfo.id);
  }

  render() {
    const {
      error, loading, pointsEarned, activitiesLogged,
    } = this.props;
    const { user } = this.state;
    let dashboardHtml;
    if (loading) {
      dashboardHtml = <p>Loading ...</p>;
    } else if (!loading && error) {
      dashboardHtml = <p>The was an error while fetching your data. Please try again later.</p>;
    } else {
      dashboardHtml = (
        <div className='wrapper'>
          <HeroComponent />
          <div className='main-content'>
            <SidebarComponent className='sidebar' />
            <div className='sub-content'>
              <NavbarComponent />
              <div className='user-dashboard'>
                <h2 className='user-dashboard__name col-sm-12'>{user.name}</h2>
                <div className='col-sm-12'>
                  <h3 className='user-dashboard__level'>D2</h3>
                </div>
                <div className='profile-overview col-sm-12'>
                  <div className='profile-overview__image' />
                  <MyStatsComponent points={pointsEarned} activities={activitiesLogged} />
                  <SocietyStatsComponent usedPoints={1508} remainingPoints={326} />
                </div>
                <div className='user-dashboard__actions col-sm-12'>
                  <h3 className='user-dashboard__title'>My Activities</h3>
                  <div>
                    <ButtonComponent className='user-dashboard__button button__add'>
                      <span className='fa fa-plus' />
                      <span>Log Points</span>
                    </ButtonComponent>
                    <ButtonComponent className='user-dashboard__button button__filter'>
                      <span>Filter</span>
                      <span className='fa fa-filter' />
                    </ButtonComponent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return dashboardHtml;
  }
}

const mapStateToProps = ({ dashboard }) => ({
  error: null,
  loading: dashboard.loading,
  pointsEarned: dashboard.pointsEarned,
  userActivities: dashboard.userActivities,
  activitiesLogged: dashboard.activitiesLogged,
});

export default connect(
  mapStateToProps,
  {
    fetchUserActivites: actions.fetchUserActivitiesRequest,
  },
)(DashboardComponent);
