import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  hasAllowedRole,
  dateFormatter,
  filterActivities,
  filterActivitiesByStatus,
} from '../helpers';
import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import LinearLayout from '../containers/LinearLayout';
import Stats from '../components/sidebar/Stats';
import stats from '../fixtures/stats';
import { fetchSocietyInfo } from '../actions/societyInfoActions';
import { verifyActivity, verifyActivitiesOps } from '../actions/verifyActivityActions';
import SnackBar from '../components/notifications/SnackBar';


class VerifyActivities extends Component {
  /**
    * @name VerifyActivities
    * @type {propTypes}
    * @param {Object} props - React PropTypes
    * @property {Function} fetchSocietyInfo - fetches society details
    */
  static propTypes = {
    fetchSocietyInfo: PropTypes.func.isRequired,
    requesting: PropTypes.bool.isRequired,
    verifyActivity: PropTypes.func.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    }).isRequired,
    verifyActivitiesOps: PropTypes.func,
    roles: PropTypes.shape({}),
  }

  static defaultProps = {
    verifyActivitiesOps: () => { },
    roles: {},
  }

  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - props
   */
  static getDerivedStateFromProps(nextProps) {
    const { societyName, societyActivities } = nextProps;
    const activities = filterActivitiesByStatus(societyActivities, 'in review');
    return {
      activities,
      societyName,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      showUserDetails: true,
      societyName: '',
      isSelectAllChecked: false,
      selectedActivities: [],
      showButtons: true,
      message: null,
    };
  }

  componentDidMount() {
    if (this.state.societyName) this.props.fetchSocietyInfo(this.state.societyName);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.societyName !== this.state.societyName) {
      this.props.fetchSocietyInfo(this.state.societyName);
    }
  }
  handleClick = (isApproved, activityId) => {
    this.props.verifyActivity(isApproved, activityId);
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
    const { isSelectAllChecked, activities } = this.state;
    const selectedActivities = activities.filter(activity =>
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
      activities,
      showUserDetails,
      isSelectAllChecked,
      selectedActivities,
      showButtons,
    } = this.state;
    const page = this.props.history.location.pathname;
    const { roles } = this.props;
    if (roles && hasAllowedRole(Object.keys(roles), ['success ops'])) {
      return (
        <LinearLayout
          items={
            activities.map((activity) => {
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
                page={page}
                handleClick={this.handleClick}
                isSelectAllChecked={isSelectAllChecked}
                selectedActivities={selectedActivities}
                handleDeselectActivity={this.handleDeselectActivity}
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
          activities.map((activity) => {
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
              page={page}
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
    const { requesting, roles } = this.props;
    const { message } = this.state;
    let snackBarMessage = '';
    if (message) {
      snackBarMessage = <SnackBar message={message} />;
    }
    const hideFilter = true;
    const showSelectAllApproveBtn = (roles && hasAllowedRole(Object.keys(roles), ['success ops']));
    return (
      <Page>
        <div className='mainContent'>
          <div className='VerifyActivities'>
            <PageHeader
              title='Verify Activities'
              hideFilter={hideFilter}
              showSelectAllApproveBtn={showSelectAllApproveBtn}
              handleSelectAllClick={this.handleSelectAllClick}
              handleApproveAllClick={this.handleApproveAllClick}
            />
            <div className='activities'>
              {
                requesting ?
                  <h3 className='loader'>Loading... </h3>
                  :
                  this.renderLayout()
              }
            </div>
          </div>
        </div>
        <aside className='sideContent'>
          <Stats
            stats={stats}
          />
        </aside>
        { snackBarMessage }
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  societyActivities: state.societyActivities.activities,
  societyName: state.userProfile.info.society.name,
  requesting: state.societyActivities.requesting,
  roles: state.userProfile.info.roles,
});

const mapDispatchToProps = dispatch => ({
  fetchSocietyInfo: name => dispatch(fetchSocietyInfo(name)),
  verifyActivity: (isApproved, activityId) => dispatch(verifyActivity(isApproved, activityId)),
  verifyActivitiesOps: activityIds => dispatch(verifyActivitiesOps(activityIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyActivities);
