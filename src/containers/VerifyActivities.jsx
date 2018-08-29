import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// helpers
import {
  hasAllowedRole,
  dateFormatter,
  filterActivitiesByStatus,
  statsGenerator,
} from '../helpers';

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

// constants
import { SUCCESS_OPS, SOCIETY_SECRETARY } from '../constants/roles';
import { PENDING, IN_REVIEW } from '../constants/statuses';
import clickActions from '../constants/clickAction';

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
    fetchAllActivities: () => { },
    verifyActivity: () => { },
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
      const showMoreInfoButton = userRoles.length > 0 && hasAllowedRole(userRoles, [SUCCESS_OPS]);
      let {
        showTabs,
      } = state;
      let filteredActivities;
      if (hasAllowedRole(userRoles, [SUCCESS_OPS])) {
        showTabs = true;
        filteredActivities = filterActivitiesByStatus(allActivities, PENDING)
          .filter(activity => (activity.society.name.toLowerCase() === selectedSociety));
      } else {
        filteredActivities = filterActivitiesByStatus(allActivities, IN_REVIEW)
          .filter(activity => (activity.society.name.toLowerCase() === societyName.toLowerCase()));
      }

      return {
        filteredActivities,
        societyName,
        showTabs,
        showButtons,
        showMoreInfoButton,
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
      selectedActivity: {},
      message: null,
      selectedSociety: 'istelle',
      showTabs: false,
      showMoreInfoButton: false,
      showModal: false,
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
    if (!this.props.userRoles.length) {
      this.props.fetchAllActivities();
    }
  }

  /**
   * @name handleClick
   * handle the click event for all the buttons
   * @param {string} clickAction - action clicked/status
   * @param {string} activityId - id of the activity clicked
   */
  handleClick = (clickAction, activityId) => {
    const { userRoles } = this.props;
    const { APPROVE, MORE_INFO, REJECT } = clickActions;
    switch (clickAction) {
    case APPROVE:
    {
      if (hasAllowedRole(userRoles, [SUCCESS_OPS])) {
        this.props.verifyActivitiesOps([activityId]);
        break;
      }
      this.props.verifyActivity(clickAction, activityId);
      break;
    }
    case MORE_INFO:
    {
      const selectedActivity = this.state.filteredActivities.find(activity => (activity.id === activityId));
      selectedActivity.itemType = 'activity';
      this.setState({ showModal: true, selectedActivity });
      break;
    }
    case REJECT:
    {
      this.props.verifyActivity(clickAction, activityId);
      break;
    }
    default:
      return null;
    }
    return null;
  }

  /**
   * @name deselectActivity
   * @summary closes the comment form modal
   */
  deselectActivity = () => {
    this.setState({ selectedActivity: {}, showModal: false });
  }

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
   * @param {string} title
   */
  handleChangeTab = (event, title) => {
    event.preventDefault();
    const selectedSocietyActivities = filterActivitiesByStatus(this.props.allActivities, PENDING)
      .filter(activity => (activity.society.name.toLowerCase() === title.toLowerCase()));
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
      showMoreInfoButton,
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
                activityDate,
                description,
                points,
                status,
              } = activity;
              return (<ActivityCard
                id={id}
                category={category}
                date={dateFormatter(activityDate)}
                description={description || 'There is no description for this activity'}
                points={points}
                status={status}
                showUserDetails={showUserDetails}
                page={pathname}
                showButtons={showButtons}
                showMoreInfoButton={showMoreInfoButton}
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
              activityDate,
              description,
              points,
              status,
            } = activity;
            return (<ActivityCard
              id={id}
              category={category}
              date={dateFormatter(activityDate)}
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
   * @summary Renders Verify activities page
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
      selectedActivity,
      showModal,
    } = this.state;
    let snackBarMessage = '';
    if (message) {
      snackBarMessage = <SnackBar message={message} />;
    }
    const hideFilter = true;
    const showSelectAllApproveBtn = (userRoles.length > 0 && hasAllowedRole(userRoles, [SUCCESS_OPS]));
    let disableButton = false;
    if (!filteredActivities.length) {
      disableButton = true;
    }
    return (
      <Page
        showModal={showModal}
        selectedItem={selectedActivity}
        deselectItem={this.deselectActivity}
      >
        <div className='mainContent'>
          <div className='VerifyActivities'>
            {
              requesting ?
                <Loader />
                :
                <div>
                  <PageHeader
                    title='Verify Activities'
                    hideFilter={hideFilter}
                    selectedStatus={selectedStatus}
                    selectedSociety={selectedSociety}
                    showSelectAllApproveBtn={showSelectAllApproveBtn}
                    handleSelectAllClick={this.handleSelectAllClick}
                    handleApproveAllClick={this.handleApproveAllClick}
                    userRoles={this.props.userRoles}
                    showTabs={showTabs}
                    tabs={tabs}
                    handleChangeTab={this.handleChangeTab}
                    disabled={disableButton}
                  />
                  <div className='activities'>
                    {this.renderLayout()}
                  </div>
                </div>
            }
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
