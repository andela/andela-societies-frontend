import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  ButtonComponent,
} from '../../common/components';
import MyStatsComponent from './MyStatsComponent';
import SocietyStatsComponent from './SocietyStatsComponent';
import LoginModal from './LogPointsModal';

import { actions } from '../operations';
import { getUserInfo, getToken } from '../../utils/tokenIsValid';

export class DashboardComponent extends Component {
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
    loading: false,
    pointsEarned: 0,
    activitiesLogged: 0,
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
    error: PropTypes.shape({}),
    pointsEarned: PropTypes.number,
    activitiesLogged: PropTypes.number,
    fetchUserActivites: PropTypes.func,
    loadCategories: PropTypes.func,
  };

  componentDidMount() {
    const { fetchUserActivites, loadCategories } = this.props;
    const token = getToken();
    const userInfo = getUserInfo(token);
    this.setState({ user: userInfo });
    fetchUserActivites(userInfo.id);
    loadCategories();
  }

  openModalLoginPointsHandler = () => {
    this.setState({
      logPoints: true,
    });
  }

  closeLogPointsModal = () => {
    this.setState({
      logPoints: false,
    });
  }

  render() {
    const {
      error, loading, pointsEarned, activitiesLogged,
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
            {
              logPoints
                ? (
                  <LoginModal
                    className='modal'
                    show={logPoints}
                    close={this.closeLogPointsModal}
                  />
                )
                : null
            }
            <div>
              <button type='button' className='button__add' onClick={this.openModalLoginPointsHandler}>
                <span className='fa fa-plus' />
                <span>Log Points</span>
              </button>
              <ButtonComponent className='button__filter' onClick={this.openModalLoginPointsHandler}>
                <span>Filter</span>
                <span className='fa fa-filter' />
              </ButtonComponent>
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
)(DashboardComponent);
