import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../operations';
import SocietyActivities from './SocietyActivitiesComponent';
import LogPointsComponent from '../../Dashboard/components/LogPointsModalContainer';
import {
  ButtonComponent, TabsComponent, SocietyStatsComponent, ToastMessageComponent,
} from '../../common/components';

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
    successMessage: '',
    showToastMessage: false,
  };

  static propTypes = {
    match: PropTypes.shape({}),
    society: PropTypes.shape({}),
    fetchSocietyInfoRequest: PropTypes.func,
    fetchSocietyRedemptionsRequest: PropTypes.func,
    successMessage: PropTypes.string,
    showToastMessage: PropTypes.bool,
  };

  state = {
    selectedTab: 'activities',
    logPoints: false,
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

  logPointsModal = () => {
    const { logPoints } = this.state;
    this.setState({
      logPoints: !logPoints,
    });
  };

  render() {
    const { selectedTab, logPoints } = this.state;
    const {
      society,
      match: {
        params: { society: societyName },
      },
      successMessage,
      showToastMessage,
    } = this.props;
    const {
      usedPoints, pointsEarned, redemptions, remainingPoints, activitiesLogged, loggedActivities,
    } = society[
      societyName
    ];
    const societyData = selectedTab === 'activities' ? loggedActivities : redemptions;
    const tabNames = ['activities', 'redemptions'];
    let logPointsComponent;
    if (logPoints) {
      logPointsComponent = <LogPointsComponent open={logPoints} close={this.logPointsModal} />;
    }
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
          <ToastMessageComponent
            className='success'
            show={showToastMessage}
          >
            <div>
              <span className='success-message'>{successMessage}</span>
              <span className='checkmark'>
                <div className='checkmark_stem' />
                <div className='checkmark_kick' />
              </span>
            </div>
          </ToastMessageComponent>
          <TabsComponent selectedTab={selectedTab} changeSelectedTab={this.changeSelectedTab} tabNames={tabNames} />
          <div>
            <ButtonComponent
              className='button__add'
              onClick={this.logPointsModal}
            >
              <span className='fa fa-plus' />
              <span>Log Points</span>
            </ButtonComponent>
            <ButtonComponent className='button__filter'>
              <span>Filter</span>
              <span className='fa fa-filter' />
            </ButtonComponent>
          </div>
        </div>
        {logPointsComponent}
        <SocietyActivities activities={societyData} selectedTab={selectedTab} />
      </div>
    );
  }
}

const mapStateToProps = ({ society, dashboard }) => ({
  loading: society.loading,
  society,
  successMessage: dashboard.activity.message,
  showToastMessage: dashboard.showToastMessage,
});

const mapDispatchToProps = {
  fetchSocietyInfoRequest: actions.fetchSocietyInfoRequest,
  fetchSocietyRedemptionsRequest: actions.fetchSocietyRedemptionsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocietiesContainer);
