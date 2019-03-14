import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ButtonComponent } from '../../common/components';
import MyStatsComponent from './MyStatsComponent';
import SocietyStatsComponent from './SocietyStatsComponent';
import LogPointsComponent from './LogPointsModal';
import MyActivitiesComponent from './MyActivitiesComponent';

import { myStats } from '../constants';
import { actions } from '../operations';
import { getUserInfo, getToken } from '../../utils/tokenIsValid';

export class DashboardContainer extends Component {
  state = {
    user: {},
    logPoints: false,
  };

  /**
   * @name defaultProps
   * @type {PropType}
   * @property {func} fetchUserActivites
   *
   */
  static defaultProps = {
    error: {},
    society: '',
    loading: false,
    pointsEarned: myStats.points,
    activitiesLogged: myStats.activities,
    userActivities: myStats.userActivities,
    fetchUserActivites: () => {},
    loadCategories: () => {},
  };

  /**
   * @name propTypes
   * @type {PropType}
   * @property {func} fetchUserActivites
   *
   */
  static propTypes = {
    loading: PropTypes.bool,
    society: PropTypes.string,
    error: PropTypes.shape({}),
    pointsEarned: PropTypes.number,
    activitiesLogged: PropTypes.number,
    fetchUserActivites: PropTypes.func,
    loadCategories: PropTypes.func,
    userActivities: PropTypes.arrayOf(PropTypes.shape({})),
  };

  componentDidMount() {
    const { fetchUserActivites, loadCategories } = this.props;
    const token = getToken();
    const userInfo = getUserInfo(token);
    this.setState({ user: userInfo });
    fetchUserActivites(userInfo.id);
    loadCategories();
  }

  logPointsModal = () => {
    const { logPoints } = this.state;
    this.setState({
      logPoints: !logPoints,
    });
  }

  render() {
    const {
      error, loading, pointsEarned, activitiesLogged, userActivities, society,
    } = this.props;
    const {
      user, logPoints,
    } = this.state;
    let dashboardHtml;
    if (loading) {
      dashboardHtml = <p>Loading ...</p>;
    } else if (!loading && error) {
      dashboardHtml = <p>The was an error while fetching your data. Please try again later.</p>;
    } else {
      dashboardHtml = (
        <div className='user-dashboard'>
          <h2 className='user-dashboard__name col-sm-12'>{user.name}</h2>
          <div className='col-sm-12 user-dashboard__level--container'>
            <h3 className='user-dashboard__level'>D2</h3>
          </div>
          <div className='profile-overview col-sm-12'>
            <div className='profile-overview__image' />
            <MyStatsComponent points={pointsEarned} activities={activitiesLogged} />
            <SocietyStatsComponent society={society} usedPoints={1508} remainingPoints={326} />
          </div>
          <div className='user-dashboard__actions col-sm-12'>
            <h3 className='user-dashboard__title'>My Activities</h3>
            <div>
              <ButtonComponent
                type='button'
                className='button__add user-dashboard__button'
                onClick={this.logPointsModal}
              >
                <span className='fa fa-plus' />
                <span>Log Points</span>
              </ButtonComponent>
              <ButtonComponent className='button__filter user-dashboard__button'>
                <span>Filter</span>
                <span className='fa fa-filter' />
              </ButtonComponent>
            </div>
          </div>
          <MyActivitiesComponent userActivities={userActivities} />
          {logPoints && (
            <LogPointsComponent
              className='modal'
              open={logPoints}
              close={this.logPointsModal}
            />
          ) }
        </div>
      );
    }
    return dashboardHtml;
  }
}

const mapStateToProps = ({ dashboard }) => ({
  error: null,
  society: dashboard.society,
  loading: dashboard.loading,
  pointsEarned: dashboard.pointsEarned,
  userActivities: dashboard.userActivities,
  activitiesLogged: dashboard.activitiesLogged,
});

export default connect(
  mapStateToProps,
  {
    fetchUserActivites: actions.fetchUserActivitiesRequest,
    loadCategories: actions.loadCategories,
  },
)(DashboardContainer);
