import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { actions } from '../operations';
import SocietyActivities from './SocietyActivitiesComponent';
import LogPointsComponent from '../../Dashboard/components/LogPointsModalContainer';
import {
  ButtonComponent, TabsComponent, SocietyStatsComponent, ToastMessageComponent,
} from '../../common/components';
import { search } from '../../utils';

export class SocietiesContainer extends Component {
  static defaultProps = {
    match: {
      params: {
        society: '',
      },
    },
    society: {},
    searchText: '',
    fetchSocietyInfoRequest: null,
    fetchSocietyRedemptionsRequest: null,
    successMessage: '',
    showToastMessage: false,
  };

  static propTypes = {
    match: PropTypes.shape({}),
    society: PropTypes.shape({}),
    searchText: PropTypes.string,
    fetchSocietyInfoRequest: PropTypes.func,
    fetchSocietyRedemptionsRequest: PropTypes.func,
    successMessage: PropTypes.string,
    showToastMessage: PropTypes.bool,
  };

  state = {
    selectedTab: 'activities',
    logPoints: false,
    currentPage: 1,
    activitiesPerPage: 6,
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

  handlePageClick = (data) => {
    const { selected } = data;
    this.setState({
      currentPage: selected + 1,
    });
  };

  render() {
    const {
      selectedTab, logPoints, currentPage, activitiesPerPage,
    } = this.state;
    const {
      society,
      match: {
        params: { society: societyName },
      },
      searchText,
      successMessage,
      showToastMessage,
    } = this.props;
    const {
      usedPoints, pointsEarned, redemptions, remainingPoints, activitiesLogged, loggedActivities,
    } = society[
      societyName
    ];
    const societyData = selectedTab === 'activities' ? loggedActivities : redemptions;
    const pageCount = Math.ceil(societyData && societyData.length / activitiesPerPage);
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = societyData && societyData.slice(indexOfFirstActivity, indexOfLastActivity);
    const tabNames = ['activities', 'redemptions'];
    let logPointsComponent;
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
        <SocietyActivities
          activities={search(searchText, currentActivities)}
          selectedTab={selectedTab}
        />
        {pagination}
      </div>
    );
  }
}

const mapStateToProps = ({ society, dashboard, navbar }) => ({
  society,
  loading: society.loading,
  searchText: navbar.searchText,
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
