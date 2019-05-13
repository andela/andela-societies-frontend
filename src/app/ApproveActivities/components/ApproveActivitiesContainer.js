import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import societyActions from '../../Societies/operations/actions';

import ApproveActivitiesComponent from './ApproveActivitiesComponent';
import { ButtonComponent, SocietyStatsComponent, TabsComponent } from '../../common/components';

import ACTIVITY_STATUS from '../../common/constants';

export class ApproveActivitiesContainer extends Component {
  static defaultProps = {
    society: {},
    fetchSocietyInfoRequest: null,
    fetchSocietyRedemptionsRequest: null,
  };

  static propTypes = {
    society: PropTypes.shape({}),
    fetchSocietyInfoRequest: PropTypes.func,
    fetchSocietyRedemptionsRequest: PropTypes.func,
  };

  state = {
    selectedSociety: 'istelle',
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
    const { fetchSocietyRedemptionsRequest, fetchSocietyInfoRequest } = this.props;

    if (prevState.selectedSociety !== selectedSociety && !prevProps.society[selectedSociety].redemptions.length) {
      fetchSocietyInfoRequest(selectedSociety.toLowerCase());
      fetchSocietyRedemptionsRequest(selectedSociety.toLowerCase());
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

  render() {
    const { society } = this.props;
    const { selectedSociety, currentPage, activitiesPerPage } = this.state;
    const {
      usedPoints, pointsEarned, remainingPoints, activitiesLogged, loggedActivities,
    } = society[selectedSociety];
    const tabNames = ['istelle', 'invictus', 'phoenix', 'sparks'];
    const pendingActivities = this.filterActivitiesByPendingStatus(loggedActivities);
    const pageCount = Math.ceil(pendingActivities.length / activitiesPerPage);
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = pendingActivities.slice(indexOfFirstActivity, indexOfLastActivity);
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
        <ApproveActivitiesComponent activities={currentActivities} />
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
      </div>
    );
  }
}

const mapStateToProps = ({ society }) => ({
  society,
});

const mapDispatchToProps = {
  fetchSocietyInfoRequest: societyActions.fetchSocietyInfoRequest,
  fetchSocietyRedemptionsRequest: societyActions.fetchSocietyRedemptionsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApproveActivitiesContainer);
