import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../operations';
import SocietyActivities from './SocietyActivitiesComponent';
import { ButtonComponent, TabsComponent, SocietyStatsComponent } from '../../common/components';

export class SocietiesContainer extends Component {
  static defaultProps = {
    match: {
      params: {
        society: '',
      },
    },
    society: {},
    fetchSocietyInfoRequest: null,
    fetchSocietyRedemptionsRequest: null,
  };

  static propTypes = {
    match: PropTypes.shape({}),
    society: PropTypes.shape({}),
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
        params: { society: societyName },
      },
      fetchSocietyInfoRequest,
      fetchSocietyRedemptionsRequest,
    } = this.props;
    if (
      prevProps.match.params.society !== societyName
      && !prevProps.society[societyName].redemptions.length
    ) {
      fetchSocietyInfoRequest(societyName);
      fetchSocietyRedemptionsRequest(societyName);
    }
  }

  changeSelectedTab = (tabName) => {
    this.setState({ selectedTab: tabName });
  };

  render() {
    const { selectedTab } = this.state;
    const {
      society,
      match: {
        params: { society: societyName },
      },
    } = this.props;
    const {
      usedPoints, pointsEarned, redemptions, remainingPoints, activitiesLogged, loggedActivities,
    } = society[
      societyName
    ];
    const societyData = selectedTab === 'activities' ? loggedActivities : redemptions;
    const tabNames = ['activities', 'redemptions'];
    return (
      <div>
        <div className='profile-overview profile-overview--society'>
          <div className={`profile-overview__image--society ${societyName.toLowerCase()}`} />
          <SocietyStatsComponent
            usedPoints={usedPoints}
            totalPoints={pointsEarned}
            remainingPoints={remainingPoints}
            activitiesLogged={activitiesLogged}
            className='society-page__stats'
          />
        </div>
        <div className='user-dashboard__actions user-dashboard__actions--society col-sm-12'>
          <TabsComponent selectedTab={selectedTab} changeSelectedTab={this.changeSelectedTab} tabNames={tabNames} />
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
        <SocietyActivities activities={societyData} selectedTab={selectedTab} />
      </div>
    );
  }
}

const mapStateToProps = ({ society }) => ({
  loading: society.loading,
  society,
});

const mapDispatchToProps = {
  fetchSocietyInfoRequest: actions.fetchSocietyInfoRequest,
  fetchSocietyRedemptionsRequest: actions.fetchSocietyRedemptionsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocietiesContainer);
