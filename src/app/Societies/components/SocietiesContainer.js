import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { actions } from '../operations';
import SocietyActivities from './SocietyActivitiesComponent';
import LogPointsComponent from '../../Dashboard/components/LogPointsModalContainer';
import Filter from '../../common/components/Filter';
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
    clickNum: 0,
    activitiesPerPage: 6,
    filteredSocietyActivities: [],
    filterBy: [
      { name: 'select all', checked: false },
      { name: 'approved', checked: false },
      { name: 'in review', checked: false },
      { name: 'rejected', checked: false },
      { name: 'pending', checked: false },
    ],
    showFilterDropdown: false,
  };

  filterRef = React.createRef();

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
    window.addEventListener('mousedown', this.hideFilter);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { society: societyName },
      },
      fetchSocietyInfoRequest,
      fetchSocietyRedemptionsRequest,
    } = this.props;
    if (prevProps.society[societyName].loggedActivities !== this.props.society[societyName].loggedActivities) {
      this.setLoggedActivities();
    }
    if (prevProps.match.params.society !== societyName) {
      this.setLoggedActivities();
    }
    if (
      prevProps.match.params.society !== societyName
      && !prevProps.society[societyName].redemptions.length
    ) {
      fetchSocietyInfoRequest(societyName);
      fetchSocietyRedemptionsRequest(societyName);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.hideFilter);
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

  setLoggedActivities = () => {
    const {
      society,
      match: {
        params: { society: societyName },
      },
    } = this.props;

    const {
      loggedActivities,
    } = society[
      societyName
    ];

    const filterBy = [
      { name: 'select all', checked: false },
      { name: 'approved', checked: false },
      { name: 'in review', checked: false },
      { name: 'rejected', checked: false },
      { name: 'pending', checked: false },
    ];

    this.setState({
      filterBy,
      clickNum: 0,
      filteredSocietyActivities: loggedActivities,
    });
  }

  handleClick = index => (event) => {
    const { checked, value } = event.target;
    const { filterBy, clickNum } = this.state;

    const {
      society,
      match: {
        params: { society: name },
      },
    } = this.props;

    if (value === 'select all') {
      const filter = filterBy.map((item) => {
        if (checked) {
          return (item.checked = true), item;
        }

        this.setState({ clickNum: 0 });
        return (item.checked = false), item;
      });

      this.setState({
        filterBy: filter,
        filteredSocietyActivities: [...society[name].loggedActivities],
      });
    } else {
      const item = [...filterBy];
      let filteredSocietyActivities = [];
      let restore = false;

      if (checked && clickNum > 0) {
        item[index].checked = checked;
        const filter = society[name].loggedActivities.filter(activity => activity.status === value);
        filteredSocietyActivities = [...this.state.filteredSocietyActivities, ...filter];
      }

      if (checked && clickNum === 0) {
        item[index].checked = checked;
        const filter = this.state.filteredSocietyActivities.filter(activity => activity.status === value);
        filteredSocietyActivities = [...filter];
      }

      if (!checked) {
        item[index].checked = checked;
        item[0].checked = false;
        filteredSocietyActivities = this.state.filteredSocietyActivities.filter(activity => activity.status !== value);
        if (filteredSocietyActivities.length === 0) {
          restore = true;
          filteredSocietyActivities = society[name].loggedActivities;
        }
      }

      if (this.isAllChecked(item)) item[0].checked = true;

      this.setState({
        filterBy: item,
        clickNum: !restore ? (clickNum + 1) : 0,
        filteredSocietyActivities,
      });
    }
  }

  isAllChecked = (item) => {
    for (let i = 1; i < item.length; i += 1) {
      if (!item[i].checked) {
        return false;
      }
    }
    return true;
  }

  hideFilter = (event) => {
    const { target } = event;
    if (!target.className || target.className === 'button__filter') {
      return;
    }

    if (!this.filterRef.current.contains(target)) {
      this.setState({ showFilterDropdown: false });
    }
  };

  showFilter = () => {
    this.setState(prevState => ({ showFilterDropdown: !prevState.showFilterDropdown }));
  }

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
            <ButtonComponent
              className='button__filter'
              onClick={this.showFilter}
            >
              <span>Filter</span>
              <span className='fa fa-filter' />
            </ButtonComponent>
            <Filter
              handleClick={this.handleClick}
              filterBy={this.state.filterBy}
              show={this.state.showFilterDropdown}
              filterRef={this.filterRef}
            />
          </div>
        </div>
        {logPointsComponent}
        <SocietyActivities
          activities={search(searchText, this.state.filteredSocietyActivities || currentActivities)}
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
