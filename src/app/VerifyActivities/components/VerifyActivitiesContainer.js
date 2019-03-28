import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dashboardActions from '../../Dashboard/operations/actions';
import { actions } from '../../Societies/operations';
import { ButtonComponent, LoaderComponent } from '../../common/components';
import VerifyActivities from './VerifyActivitiesComponent';
import { SocietyStatsComponent } from '../../Dashboard/components';
import { getUserInfo, getToken } from '../../utils/tokenIsValid';
import ACTIVITY_STATUS from '../constants';

export class VerifyActivitiesContainer extends Component {
  static defaultProps = {
    society: {},
    societyName: '',
    fetchUserActivites: null,
    fetchSocietyInfoRequest: null,
  };

  static propTypes = {
    society: PropTypes.shape({}),
    societyName: PropTypes.string,
    fetchUserActivites: PropTypes.func,
    fetchSocietyInfoRequest: PropTypes.func,
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

  render() {
    const { society, societyName } = this.props;
    let verifyActivitiesHtml = (<LoaderComponent className='loader' />);
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
});

const mapDispatchToProps = {
  fetchSocietyInfoRequest: actions.fetchSocietyInfoRequest,
  fetchUserActivites: dashboardActions.fetchUserActivitiesRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyActivitiesContainer);
