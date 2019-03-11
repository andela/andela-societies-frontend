import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../operations';
import { societyStats } from '../../Dashboard/constants';
import { ButtonComponent } from '../../common/components';
import TabsComponent from './TabsComponent';
import SocietyActivities from './SocietyActivitiesComponent';
import { SocietyStatsComponent } from '../../Dashboard/components';

export class SocietiesContainer extends Component {
  static defaultProps = {
    match: {
      params: {
        society: '',
      },
    },
    usedPoints: societyStats.usedPoints,
    remainingPoints: societyStats.remainingPoints,
    totalPoints: societyStats.totalPoints,
    activitiesLogged: societyStats.activitiesLogged,
    redemptions: [],
    loggedActivities: [],
    fetchSocietyInfoRequest: null,
    fetchSocietyRedemptionsRequest: null,
  };

  static propTypes = {
    match: PropTypes.shape({}),
    usedPoints: PropTypes.number,
    totalPoints: PropTypes.number,
    remainingPoints: PropTypes.number,
    activitiesLogged: PropTypes.number,
    redemptions: PropTypes.arrayOf(PropTypes.shape({})),
    loggedActivities: PropTypes.arrayOf(PropTypes.shape({})),
    fetchSocietyInfoRequest: PropTypes.func,
    fetchSocietyRedemptionsRequest: PropTypes.func,
  };

  state = {
    selectedTab: 'activities',
  };

  componentDidMount() {
    // get society from params
    // call action to get actities for that society
    const {
      match: {
        params: { society },
      },
      fetchSocietyInfoRequest,
      fetchSocietyRedemptionsRequest,
    } = this.props;
    fetchSocietyInfoRequest(society);
    fetchSocietyRedemptionsRequest(society);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { society },
      },
      fetchSocietyInfoRequest,
      fetchSocietyRedemptionsRequest,
    } = this.props;
    if (prevProps.match.params.society !== society) {
      fetchSocietyInfoRequest(society);
      fetchSocietyRedemptionsRequest(society);
    }
  }

  changeSelectedTab = (tabName) => {
    this.setState({ selectedTab: tabName });
  };

  render() {
    const { selectedTab } = this.state;
    const {
      usedPoints,
      totalPoints,
      redemptions,
      remainingPoints,
      loggedActivities,
      activitiesLogged,
      match: {
        params: { society },
      },
    } = this.props;
    console.log('redemptions', redemptions);
    return (
      <div>
        <div className='profile-overview profile-overview--society'>
          <div className={`profile-overview__image--society ${society.toLowerCase()}`} />
          <SocietyStatsComponent
            usedPoints={usedPoints}
            totalPoints={totalPoints}
            remainingPoints={remainingPoints}
            activitiesLogged={activitiesLogged}
            className='society-page__stats'
          />
        </div>
        <div className='user-dashboard__actions user-dashboard__actions--society col-sm-12'>
          <TabsComponent selectedTab={selectedTab} changeSelectedTab={this.changeSelectedTab} />
          <div>
            <ButtonComponent className='button__add'>
              <span className='fa fa-plus' />
              <span>Log Points</span>
            </ButtonComponent>
            <ButtonComponent className='button__filter'>
              <span>Filter</span>
              <span className='fa fa-filter' />
            </ButtonComponent>
          </div>
        </div>
        <SocietyActivities activities={loggedActivities} />
      </div>
    );
  }
}

const mapStateToProps = ({ society }) => ({
  loading: society.loading,
  totalPoints: society.pointsEarned,
  usedPoints: society.usedPoints,
  redemptions: society.redemptions,
  remainingPoints: society.remainingPoints,
  loggedActivities: society.loggedActivities,
  activitiesLogged: society.activitiesLogged,
});

const mapDispatchToProps = {
  fetchSocietyInfoRequest: actions.fetchSocietyInfoRequest,
  fetchSocietyRedemptionsRequest: actions.fetchSocietyRedemptionsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocietiesContainer);
