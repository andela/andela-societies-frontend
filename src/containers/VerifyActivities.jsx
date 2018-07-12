import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// helpers
import {
  hasAllowedRole,
  dateFormatter,
  filterActivities,
  filterActivitiesByStatus,
} from '../helpers';
import statsGenerator from '../helpers/statsGenerator';

// components
import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import LinearLayout from '../containers/LinearLayout';
import Stats from '../components/sidebar/Stats';
import Loader from '../components/loaders/Loader';
import SnackBar from '../components/notifications/SnackBar';

// actions
import { fetchSocietyInfo } from '../actions/societyInfoActions';
import { verifyActivity, verifyActivitiesOps } from '../actions/verifyActivityActions';
import { fetchAllActivities } from '../actions/allActivitiesActions';

import { SUCCESS_OPS, SOCIETY_SECRETARY } from '../constants/roles';
import { PENDING, IN_REVIEW } from '../constants/statuses';
import generateIdForSociety from '../constants/societyNames';

// fixtures
import tabs from '../fixtures/tabs';

class VerifyActivities extends Component {
  /**
    * @name VerifyActivities
    * @type {propTypes}
    * @param {Object} props - React PropTypes
    * @property {Function} fetchSocietyInfo - fetches society details
    */
  static propTypes = {
    fetchAllActivities: PropTypes.func,
    requesting: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    }).isRequired,
    verifyActivity: PropTypes.func,
    verifyActivitiesOps: PropTypes.func,
    allActivities: PropTypes.arrayOf(PropTypes.shape({})),
    userRoles: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    verifyActivitiesOps: () => { },
    fetchAllActivities: () => {},
    verifyActivity: () => {},
    userRoles: [],
    allActivities: [],
  }

  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - props
   */
  static getDerivedStateFromProps(props, state) {
    if (props.userRoles.length) {
      const { allActivities, societyName } = props;
      const { selectedSociety } = state;
      const userRoles = props.userRoles ? props.userRoles : [];
      const showButtons = userRoles.length > 0 && hasAllowedRole(userRoles, [SOCIETY_SECRETARY, SUCCESS_OPS]);
      let {
        showTabs,
      } = state;

      let filteredActivities;
      if (hasAllowedRole(userRoles, [SUCCESS_OPS])) {
        showTabs = true;
        filteredActivities = filterActivitiesByStatus(allActivities, PENDING)
          .filter(activity => (activity.societyName === generateIdForSociety(selectedSociety)));
      } else {
        filteredActivities = filterActivitiesByStatus(allActivities, IN_REVIEW)
          .filter(activity => (activity.societyName === generateIdForSociety(societyName)));
      }

      return {
        filteredActivities,
        societyName,
        showTabs,
        showButtons,
      };
    }
    return { ...state, userRoles: null };
  }

  constructor(props) {
    super(props);
    this.state = {
      filteredActivities: [],
      showUserDetails: true,
      selectedStatus: PENDING,
      isSelectAllChecked: false,
      selectedActivities: [],
      message: null,
      selectedSociety: 'istelle',
      showTabs: false,
    };
  }

  /**
   * @name componentDidMount
   * @summary Lifecycle method called when component is mounted
   */
  componentDidMount() {
    this.props.fetchAllActivities();
  }

  /**
   * @name componentDidUpdate
   * @summary Lifecycle method called when there are updates
   *
   */
  componentDidUpdate() {
    if (!this.props.userRoles) {
      this.props.fetchAllActivities();
    }
  }

  /**
   * handle the click event for the verify button
   * @memberof handleClick
   */
  handleClick = (clickAction, activityId) => {
    const { userRoles } = this.props;
    if (hasAllowedRole(userRoles, [SUCCESS_OPS])) {
      this.props.verifyActivitiesOps(activityId);
    } else {
      this.props.verifyActivity(clickAction, activityId);
    }
  }

  /**
   * Filters state based on the selectedStatus
   * @memberof MyActivities
   */
  filterActivities = (status) => {
    this.setState({
      filteredActivities: filterActivities(status, this.state)
        .filteredActivities,
      selectedStatus: status,
    });
  };

  /**
   * @name handleSelectAllClick
   * @summary toggles state when select all is checked and updates it with selected activities
   * @returns {void}
   */
  handleSelectAllClick = () => {
    const { isSelectAllChecked, filteredActivities } = this.state;
    const selectedActivities = filteredActivities.filter(activity =>
      (!isSelectAllChecked && activity.id)).map(activity => activity.id);
    this.setState({ isSelectAllChecked: !isSelectAllChecked, selectedActivities });
  }

  /**
   * @name handleDeselectActivity
   * @summary updates state with activities deselected using the checkbox
   * @param {string} id - id of the activity deselected
   * @returns {void}
                                                                                                           */
  handleDeselectActivity = (id) => {
    const { selectedActivities } = this.state;
    const selected = selectedActivities.filter(activityId => activityId !== id);
    this.setState({ selectedActivities: selected });
  }

  /**
   * @name handleChangeTab
   * @summary states appropriate state values when a specific society is selected
   */
  handleChangeTab = (event, title) => {
    event.preventDefault();
    const selectedSocietyActivities = filterActivitiesByStatus(this.props.allActivities, PENDING)
      .filter(activity => (activity.societyName === generateIdForSociety(title)));
    this.setState({
      selectedSociety: title.toLowerCase(),
      filteredActivities: selectedSocietyActivities,
    });
  }

  /**
   * @name handleApproveAllClick
   * @summary handles calling the action to approve selected activities
   * @returns void
   */
  handleApproveAllClick = () => {
    const { selectedActivities } = this.state;
    if (!selectedActivities.length) {
      this.setState({
        show: true,
        message: ({
          text: 'Please Select an Activity to Approve',
          type: 'error',
        }),
      });
    }
    this.props.verifyActivitiesOps(selectedActivities);
  };

  /**
   * @name renderLayout
   * @summary renders different layout depending on role
   * @returns {void}
   */
  renderLayout() {
    const {
      filteredActivities,
      showUserDetails,
      isSelectAllChecked,
      selectedActivities,
      showButtons,
    } = this.state;
    const { history: { location: { pathname } }, userRoles } = this.props;
    const showCheckBox = hasAllowedRole(userRoles, [SUCCESS_OPS]);
    if (userRoles.length > 0 && hasAllowedRole(userRoles, [SUCCESS_OPS])) {
      return (
        <LinearLayout
          items={
            filteredActivities.map((activity) => {
              const {
                id,
                category,
                date,
                description,
                points,
                status,
              } = activity;
              return (<ActivityCard
                id={id}
                category={category}
                date={dateFormatter(date)}
                description={description || 'There is no description for this activity'}
                points={points}
                status={status}
                showUserDetails={showUserDetails}
                page={pathname}
                showButtons={showButtons}
                handleClick={this.handleClick}
                isSelectAllChecked={isSelectAllChecked}
                selectedActivities={selectedActivities}
                handleDeselectActivity={this.handleDeselectActivity}
                showCheckBox={showCheckBox}
                wordCount={70}
              />);
            })
          }
        />
      );
    }
    return (
      <MasonryLayout
        items={
          filteredActivities.map((activity) => {
            const {
              id,
              category,
              date,
              description,
              points,
              status,
            } = activity;
            return (<ActivityCard
              id={id}
              category={category}
              date={dateFormatter(date)}
              description={description || 'There is no description for this activity'}
              points={points}
              status={status}
              showUserDetails={showUserDetails}
              showButtons={showButtons}
              page={pathname}
              handleClick={this.handleClick}
            />);
          })
        }
      />
    );
  }

  /**
   * @name VerifyActivities
   * @summary Renders My activities page
   * @return React node that displays the VerifyActivities page
   */
  render() {
    const { requesting, userRoles } = this.props;
    const {
      message,
      filteredActivities,
      showTabs,
      selectedStatus,
      selectedSociety,
    } = this.state;
    let snackBarMessage = '';
    if (message) {
      snackBarMessage = <SnackBar message={message} />;
    }
    const hideFilter = true;
    const showSelectAllApproveBtn = (userRoles.length > 0 && hasAllowedRole(userRoles, [SUCCESS_OPS]));
    return (
      <Page>
        <div className='mainContent'>
          <div className='VerifyActivities'>
            <PageHeader
              title='Verify Activities'
              hideFilter={hideFilter}
              filterActivities={this.filterActivities}
              selectedStatus={selectedStatus}
              selectedSociety={selectedSociety}
              showSelectAllApproveBtn={showSelectAllApproveBtn}
              handleSelectAllClick={this.handleSelectAllClick}
              handleApproveAllClick={this.handleApproveAllClick}
              userRoles={this.props.userRoles}
              showTabs={showTabs}
              tabs={tabs}
              handleChangeTab={this.handleChangeTab}
            />
            <div className='activities'>
              {
                requesting ?
                  <Loader />
                  :
                  this.renderLayout()
              }
            </div>
          </div>
        </div>
        <aside className='sideContent'>
          <Stats
            stats={statsGenerator(filteredActivities, 'Verify activities', 'Total points')}
          />
        </aside>
        {snackBarMessage}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  allActivities: state.allActivities.activities,
  societyName: state.userProfile.info.society.name,
  requesting: state.allActivities.requesting,
  userRoles: Object.keys(state.userProfile.info.roles),
});

export default connect(mapStateToProps, {
  fetchAllActivities,
  fetchSocietyInfo,
  verifyActivity,
  verifyActivitiesOps,
})(VerifyActivities);
