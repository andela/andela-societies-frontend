import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import { actions } from '../../Societies/operations';
import {
  ButtonComponent, LoaderComponent, VerifyAlertModal, SocietyStatsComponent, ToastMessageComponent,
} from '../../common/components';
import VerifyActivities from './VerifyActivitiesComponent';
import dashboardActions from '../../Dashboard/operations/actions';

import ACTIVITY_STATUS from '../../common/constants';
import { getUserInfo, getToken } from '../../utils/tokenIsValid';
import LogPointsComponent from '../../Dashboard/components/LogPointsModalContainer';


export class VerifyActivitiesContainer extends Component {
  static defaultProps = {
    society: {},
    societyName: '',
    userRole: {},
    fetchUserActivites: null,
    fetchSocietyInfoRequest: null,
    successMessage: '',
    showToastMessage: false,
    verifyActivity: null,
    showVerifyAlert: false,
    verifiedSecretaryActivity: {},
  };

  static propTypes = {
    society: PropTypes.shape({}),
    userRole: PropTypes.shape({}),
    societyName: PropTypes.string,
    fetchUserActivites: PropTypes.func,
    fetchSocietyInfoRequest: PropTypes.func,
    successMessage: PropTypes.string,
    showToastMessage: PropTypes.bool,
    verifyActivity: PropTypes.func,
    showVerifyAlert: PropTypes.bool,
    verifiedSecretaryActivity: PropTypes.shape({}),
  };

  state = {
    logPoints: false,
    currentPage: 1,
    activitiesPerPage: 6,
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

  handleVerify = (loggedActivityId, status) => {
    const { verifyActivity } = this.props;
    verifyActivity(loggedActivityId, status);
  }

  handlePageClick = (data) => {
    const { selected } = data;
    this.setState({
      currentPage: selected + 1,
    });
  };

  render() {
    const { logPoints, currentPage, activitiesPerPage } = this.state;
    const {
      society, userRole, societyName, showVerifyAlert, verifiedSecretaryActivity, successMessage, showToastMessage,
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
      const pageCount = Math.ceil(inReviewActivities.length / activitiesPerPage);
      const indexOfLastActivity = currentPage * activitiesPerPage;
      const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
      const currentActivities = inReviewActivities.slice(indexOfFirstActivity, indexOfLastActivity);
      const pagination = (currentActivities && currentActivities > 6)
        ? (
          <ReactPaginate
            previousLabel='previous'
            nextLabel='next'
            breakLabel='...'
            breakClassName='break-me'
            pageCount={pageCount}
            marginPagesDisplayed={3}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName='pagination'
            subContainerClassName='pages pagination'
            activeClassName='active'
          />
        )
        : null;
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
          <VerifyAlertModal
            open={showVerifyAlert}
          >
            <div>
              <span className='message'>
                {verifiedSecretaryActivity.points}
                {' '}
                Points Approved for
                {' '}
                {verifiedSecretaryActivity.owner}
              </span>
              <span className='alert'>
                <div className='alert__stem' />
                <div className='alert__kick' />
              </span>
            </div>
          </VerifyAlertModal>
          <VerifyActivities
            userRole={userRole}
            activities={currentActivities}
            handleVerify={this.handleVerify}
          />
          {pagination}
        </div>
      );
    }
    return verifyActivitiesHtml;
  }
}

const mapStateToProps = ({ society, dashboard, sidebar }) => ({
  society,
  userRole: sidebar.userRole,
  societyName: dashboard.society,
  successMessage: dashboard.activity.message,
  showToastMessage: dashboard.showToastMessage,
  showVerifyAlert: society.verifyAlertMessage,
  verifiedSecretaryActivity: society.verifiedSecretaryActivity,
});

const mapDispatchToProps = {
  fetchSocietyInfoRequest: actions.fetchSocietyInfoRequest,
  fetchUserActivites: dashboardActions.fetchUserActivitiesRequest,
  verifyActivity: (loggedActivityId, status) => actions.verifyActivityRequest(loggedActivityId, status),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyActivitiesContainer);
