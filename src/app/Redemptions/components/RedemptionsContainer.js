import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dashboardActions from '../../Dashboard/operations/actions';
import societyActions from '../../Societies/operations/actions';
import { getUserInfo, getToken } from '../../utils/tokenIsValid';

import RedemptionsComponent from './RedemptionsComponent';
import { SocietyStatsComponent } from '../../Dashboard/components';
import { ButtonComponent, LoaderComponent } from '../../common/components';

export class RedemptionsContainer extends Component {
  static defaultProps = {
    society: {},
    societyName: '',
    fetchUserActivites: null,
    fetchSocietyInfoRequest: null,
    fetchSocietyRedemptionsRequest: null,
  };

  static propTypes = {
    society: PropTypes.shape({}),
    societyName: PropTypes.string,
    fetchUserActivites: PropTypes.func,
    fetchSocietyInfoRequest: PropTypes.func,
    fetchSocietyRedemptionsRequest: PropTypes.func,
  };

  componentDidMount() {
    const {
      fetchSocietyRedemptionsRequest, fetchSocietyInfoRequest, societyName, fetchUserActivites,
    } = this.props;
    const token = getToken();
    const userInfo = getUserInfo(token);
    fetchUserActivites(userInfo.id);
    fetchSocietyInfoRequest(societyName.toLowerCase());
    fetchSocietyRedemptionsRequest(societyName.toLowerCase());
  }

  componentDidUpdate(prevProps) {
    const {
      fetchSocietyRedemptionsRequest, fetchSocietyInfoRequest, societyName,
    } = this.props;
    if (prevProps.societyName !== societyName && !prevProps.society[societyName.toLowerCase()].redemptions.length) {
      fetchSocietyInfoRequest(societyName.toLowerCase());
      fetchSocietyRedemptionsRequest(societyName.toLowerCase());
    }
  }

  render() {
    const { society, societyName } = this.props;
    let verifyActivitiesHtml = <LoaderComponent className='loader' />;
    if (societyName) {
      const {
        usedPoints, pointsEarned, remainingPoints, activitiesLogged, redemptions,
      } = society[
        societyName.toLowerCase()
      ];
      // const inReviewActivities = this.filterActivitiesByInReviewStatus(loggedActivities);
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
            <h3 className='user-dashboard__title'>Latest Activities</h3>
            <div>
              <ButtonComponent className='button__add'>
                <span className='fa fa-plus' />
                <span>Log Points</span>
              </ButtonComponent>
              <ButtonComponent className='button__add button__redemption'>
                <span className='fa fa-plus' />
                <span>New Redemption</span>
              </ButtonComponent>
              <ButtonComponent className='button__filter'>
                <span>Filter</span>
                <span className='fa fa-filter' />
              </ButtonComponent>
            </div>
          </div>
          <RedemptionsComponent activities={redemptions} />
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
  fetchUserActivites: dashboardActions.fetchUserActivitiesRequest,
  fetchSocietyInfoRequest: societyActions.fetchSocietyInfoRequest,
  fetchSocietyRedemptionsRequest: societyActions.fetchSocietyRedemptionsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RedemptionsContainer);
