import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import societyActions from '../../Societies/operations/actions';
import activityActions from '../operations/actions';

import SocietyActivitiesComponent from './SocietyActivitiesComponent';
import {
  ButtonComponent, SocietyStatsComponent, TabsComponent, AlertDialogComponent,
} from '../../common/components';

import { search } from '../../utils';
import ACTIVITY_STATUS from '../../common/constants';

export class SocietyActivitiesContainer extends Component {
  static defaultProps = {
    society: {},
    status: '',
    message: '',
    searchText: '',
    rejectActivity: null,
    approveActivity: null,
    fetchSocietyInfoRequest: null,
    resetRejectActivityStatus: null,
    resetApproveActivityStatus: null,
    fetchSocietyRedemptionsRequest: null,
  };

  static propTypes = {
    status: PropTypes.string,
    message: PropTypes.string,
    society: PropTypes.shape({}),
    searchText: PropTypes.string,
    rejectActivity: PropTypes.func,
    approveActivity: PropTypes.func,
    fetchSocietyInfoRequest: PropTypes.func,
    resetRejectActivityStatus: PropTypes.func,
    resetApproveActivityStatus: PropTypes.func,
    fetchSocietyRedemptionsRequest: PropTypes.func,
  };

  state = {
    selectedSociety: 'istelle',
    currentPage: 1,
    activitiesPerPage: 6,
    alertDialogOpen: false,
  };

  componentDidMount() {
    const { selectedSociety } = this.state;
    const { fetchSocietyRedemptionsRequest, fetchSocietyInfoRequest } = this.props;
    fetchSocietyInfoRequest(selectedSociety.toLowerCase());
    fetchSocietyRedemptionsRequest(selectedSociety.toLowerCase());
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedSociety } = this.state;
    const { fetchSocietyRedemptionsRequest, fetchSocietyInfoRequest, status } = this.props;

    if (prevState.selectedSociety !== selectedSociety && !prevProps.society[selectedSociety].redemptions.length) {
      fetchSocietyInfoRequest(selectedSociety.toLowerCase());
      fetchSocietyRedemptionsRequest(selectedSociety.toLowerCase());
    }
    if (status && prevProps.status !== status) {
      this.toggleAlertDialogOpen(true);
    }
  }

  changeSelectedSociety = (societyName) => {
    this.setState({ selectedSociety: societyName });
  };

  filterActivitiesByPendingStatus = activities => (
    activities.filter(item => item.status === ACTIVITY_STATUS.PENDING))

  handlePageClick = (data) => {
    const { selected } = data;
    this.setState({
      currentPage: selected + 1,
    });
  };

  handleApproveOrRejectClick = (id, status) => {
    const { approveActivity, rejectActivity } = this.props;
    const { selectedSociety: societyName } = this.state;
    if (status === 'approved') {
      approveActivity(id, societyName);
    } else {
      rejectActivity(id, status);
    }
  };


  handleAlertDialogClose = () => {
    const { resetApproveActivityStatus, resetRejectActivityStatus } = this.props;
    this.toggleAlertDialogOpen(false);
    resetApproveActivityStatus();
    resetRejectActivityStatus();
  }

  toggleAlertDialogOpen = (bool) => {
    this.setState(() => ({ alertDialogOpen: bool }));
  }


  render() {
    const {
      society, searchText, status, message,
    } = this.props;
    const {
      selectedSociety, currentPage, activitiesPerPage, alertDialogOpen,
    } = this.state;
    const {
      usedPoints, pointsEarned, remainingPoints, activitiesLogged, loggedActivities,
    } = society[selectedSociety];
    const tabNames = ['istelle', 'invictus', 'phoenix', 'sparks'];
    const pendingActivities = this.filterActivitiesByPendingStatus(loggedActivities);
    const pageCount = Math.ceil(pendingActivities.length / activitiesPerPage);
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = pendingActivities.slice(indexOfFirstActivity, indexOfLastActivity);
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
    return (
      <div>
        <div className='profile-overview profile-overview--society'>
          <div className={`profile-overview__image--society ${selectedSociety.toLowerCase()}`} />
          <SocietyStatsComponent
            usedPoints={usedPoints}
            totalPoints={pointsEarned}
            remainingPoints={remainingPoints}
            activitiesLogged={activitiesLogged}
            className='society-page__stats'
          />
        </div>
        <div className='user-dashboard__actions user-dashboard__actions--society col-sm-12'>
          <TabsComponent
            tabNames={tabNames}
            selectedTab={selectedSociety}
            changeSelectedTab={this.changeSelectedSociety}
          />
          <div>
            <ButtonComponent className='button__filter'>
              <span>Filter</span>
              <span className='fa fa-filter' />
            </ButtonComponent>
          </div>
        </div>
        <SocietyActivitiesComponent
          activities={search(searchText, currentActivities)}
          handleApproveOrRejectClick={this.handleApproveOrRejectClick}
        />
        {pagination}
        <AlertDialogComponent
          status={status}
          message={message}
          open={alertDialogOpen}
          onClose={this.handleAlertDialogClose}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ society, navbar, activities }) => ({
  society,
  searchText: navbar.searchText,
  status: activities.approveActivityStatus || activities.rejectActivityStatus,
  message: activities.approveActivityMessage || activities.rejectActivityMessage,
});

const mapDispatchToProps = {
  fetchSocietyInfoRequest: societyActions.fetchSocietyInfoRequest,
  fetchSocietyRedemptionsRequest: societyActions.fetchSocietyRedemptionsRequest,
  approveActivity: activityActions.approveActivityRequest,
  resetApproveActivityStatus: activityActions.resetApproveActivityStatus,
  rejectActivity: activityActions.rejectActivityRequest,
  resetRejectActivityStatus: activityActions.resetRejectActivityStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocietyActivitiesContainer);
