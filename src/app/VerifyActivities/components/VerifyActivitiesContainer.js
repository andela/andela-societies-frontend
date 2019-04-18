import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions } from '../../Societies/operations';
import dashboardActions from '../../Dashboard/operations/actions';

import ACTIVITY_STATUS from '../../common/constants';
import { getUserInfo, getToken } from '../../utils/tokenIsValid';

import VerifyActivities from './VerifyActivitiesComponent';
import LogPointsComponent from '../../Dashboard/components/LogPointsModalContainer';
import {
  ButtonComponent, LoaderComponent, SocietyStatsComponent, ToastMessageComponent,
} from '../../common/components';

export class VerifyActivitiesContainer extends Component {
  static defaultProps = {
    society: {},
    societyName: '',
    fetchUserActivites: null,
    fetchSocietyInfoRequest: null,
    successMessage: '',
    showToastMessage: false,
  };

  static propTypes = {
    society: PropTypes.shape({}),
    societyName: PropTypes.string,
    fetchUserActivites: PropTypes.func,
    fetchSocietyInfoRequest: PropTypes.func,
    successMessage: PropTypes.string,
    showToastMessage: PropTypes.bool,
  };

  state = {
    logPoints: false,
  };

  componentDidMount() {
    const { fetchSocietyInfoRequest, societyName, fetchUserActivites } = this.props;
    const token = getToken();
    const userInfo = getUserInfo(token);
    fetchUserActivites(userInfo.id);
    fetchSocietyInfoRequest(societyName.toLowerCase());
  }

  componentDidUpdate(prevProps) {
    const { fetchSocietyInfoRequest, societyName } = this.props;
    if (prevProps.societyName !== societyName) {
      fetchSocietyInfoRequest(societyName.toLowerCase());
    }
  }

  filterActivitiesByInReviewStatus = activities => (
    activities.filter(activity => activity.status === ACTIVITY_STATUS.IN_REVIEW))

  logPointsModal = () => {
    const { logPoints } = this.state;
    this.setState({
      logPoints: !logPoints,
    });
  };

  render() {
    const { logPoints } = this.state;
    const {
      society, societyName, successMessage, showToastMessage,
    } = this.props;
    let verifyActivitiesHtml = (<LoaderComponent className='loader' />);
    let logPointsComponent;
    if (logPoints) {
      logPointsComponent = <LogPointsComponent open={logPoints} close={this.logPointsModal} />;
    }
    if (societyName) {
      const {
        usedPoints, pointsEarned, remainingPoints, activitiesLogged, loggedActivities,
      } = society[
        societyName.toLowerCase()
      ];
      const inReviewActivities = this.filterActivitiesByInReviewStatus(loggedActivities);
      verifyActivitiesHtml = (
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
            <h3 className='user-dashboard__title'>Verify Activities</h3>
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
          <VerifyActivities activities={inReviewActivities} />
        </div>
      );
    }
    return verifyActivitiesHtml;
  }
}

const mapStateToProps = ({ society, dashboard }) => ({
  society,
  societyName: dashboard.society,
  successMessage: dashboard.activity.message,
  showToastMessage: dashboard.showToastMessage,
});

const mapDispatchToProps = {
  fetchSocietyInfoRequest: actions.fetchSocietyInfoRequest,
  fetchUserActivites: dashboardActions.fetchUserActivitiesRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyActivitiesContainer);
