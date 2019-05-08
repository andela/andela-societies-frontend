import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import societyActions from '../../Societies/operations/actions';

import ApproveActivitiesComponent from './ApproveBudgetComponent';
import {
  ButtonComponent, SocietyStatsComponent, TabsComponent, AlertDialogComponent,
} from '../../common/components';

import ACTIVITY_STATUS from '../../common/constants';

export class ApproveBudgetContainer extends Component {
  static defaultProps = {
    society: {},
    status: '',
    message: '',
    approveBudget: null,
    fetchSocietyInfoRequest: null,
    resetApproveBugetStatus: null,
    fetchSocietyRedemptionsRequest: null,
  };

  static propTypes = {
    status: PropTypes.string,
    message: PropTypes.string,
    society: PropTypes.shape({}),
    approveBudget: PropTypes.func,
    fetchSocietyInfoRequest: PropTypes.func,
    resetApproveBugetStatus: PropTypes.func,
    fetchSocietyRedemptionsRequest: PropTypes.func,
  };

  state = {
    selectedSociety: 'istelle',
    alertDialogOpen: false,
    currentPage: 1,
    activitiesPerPage: 6,
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

  handleAlertDialogClose = () => {
    const { resetApproveBugetStatus } = this.props;
    this.toggleAlertDialogOpen(false);
    resetApproveBugetStatus();
  }

  toggleAlertDialogOpen = (bool) => {
    this.setState(() => ({ alertDialogOpen: bool }));
  }

  changeSelectedSociety = (societyName) => {
    this.setState({ selectedSociety: societyName });
  };

  handleApproveOrRejectClick = (id, status) => {
    // call action to approve
    const { approveBudget } = this.props;
    const { selectedSociety } = this.state;
    approveBudget({ id, status, societyName: selectedSociety });
  };

  filterRedemptionsByPendingStatus = redemptions => redemptions.filter(item => item.status === ACTIVITY_STATUS.PENDING);

  handlePageClick = (data) => {
    const { selected } = data;
    this.setState({
      currentPage: selected + 1,
    });
  };

  render() {
    const { society, status, message } = this.props;
    const {
      selectedSociety, alertDialogOpen, currentPage, activitiesPerPage,
    } = this.state;
    const {
      usedPoints, pointsEarned, remainingPoints, activitiesLogged, redemptions,
    } = society[selectedSociety];
    const tabNames = ['istelle', 'invictus', 'phoenix', 'sparks'];
    const pendingRedemptions = this.filterRedemptionsByPendingStatus(redemptions);
    const pageCount = Math.ceil(pendingRedemptions.length / activitiesPerPage);
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = pendingRedemptions.slice(indexOfFirstActivity, indexOfLastActivity);

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
        <ApproveActivitiesComponent
          activities={currentActivities}
          handleApproveOrRejectClick={this.handleApproveOrRejectClick}
        />
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

const mapStateToProps = ({ society }) => ({
  society,
  status: society.approveBudgetStatus,
  message: society.approveBudgetMessage,
});

const mapDispatchToProps = {
  approveBudget: societyActions.approveBudgetRequest,
  resetApproveBugetStatus: societyActions.resetApproveBugetStatus,
  fetchSocietyInfoRequest: societyActions.fetchSocietyInfoRequest,
  fetchSocietyRedemptionsRequest: societyActions.fetchSocietyRedemptionsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApproveBudgetContainer);
