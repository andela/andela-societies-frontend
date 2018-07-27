import React from 'react';
import { connect } from 'react-redux';

// third party libraries
import PropTypes from 'prop-types';

// components
import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import ErrorMessage from '../common/ErrorMessage';
import Loader from '../components/loaders/Loader';

// thunk
import { fetchRedemption } from '../actions/redeemPointsAction';
import { verifyRedemption } from '../actions/verifyRedemptionActions';

// helpers
import dateFormatter from '../helpers/dateFormatter';
import filterActivities from '../helpers/filterActivities';
import { hasAllowedRole } from '../helpers/authentication';
import statsGenerator from '../helpers/statsGenerator';
import filterActivitiesByStatus from '../helpers/filterActivitiesByStatus';

// constants
import { VERIFICATION_USERS, SUCCESS_OPS, CIO, SOCIETY_PRESIDENT, STAFF_USERS, FINANCE } from '../constants/roles';
import { ALL, APPROVED, PENDING, REJECTED } from '../constants/statuses';
import clickActions from '../constants/clickAction';

// fixtures
import tabs from '../fixtures/tabs';
import exclamationIcon from '../fixtures/icons';

class Redemptions extends React.Component {
  /**
   * @name defaultProps
   */
  static defaultProps = {
    societyName: '',
    hasError: false,
    userRoles: [],
    requesting: false,
  }

  /**
   * @name propTypes
   */
  static propTypes = {
    hasError: PropTypes.bool,
    requesting: PropTypes.bool,
    societyName: PropTypes.string,
    fetchRedemption: PropTypes.func.isRequired,
    verifyRedemption: PropTypes.func.isRequired,
    userRoles: PropTypes.arrayOf(PropTypes.string),
  }

  /**
   * @name getDerivedStateFromProps
   * @summary Lifecycle method that returns state only when there is a change in props
   * @param {Object} props
   * @param {Object} state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.userRoles.length) {
      const userRoles = props.userRoles ? props.userRoles : [];
      const showButtons = userRoles.length > 0 && hasAllowedRole(userRoles, VERIFICATION_USERS);
      const showCompleteButton = userRoles.length > 0 && hasAllowedRole(userRoles, [FINANCE]);
      const showMoreInfoButton = userRoles.length > 0 && hasAllowedRole(userRoles, [CIO]);
      const userCanEdit = userRoles.length > 0 && hasAllowedRole(userRoles, [SOCIETY_PRESIDENT]);
      let preSelectedRemptions = props.redemptions;
      let {
        initialStatus,
        selectedStatus,
        showTabs,
        societyRedemptions,
      } = state;

      // state values for cio/success ops role
      if (hasAllowedRole(userRoles, [CIO, SUCCESS_OPS, FINANCE])) {
        showTabs = true;
        initialStatus = PENDING;
        selectedStatus = PENDING;

        societyRedemptions = props.redemptions
          .filter(redemption => redemption.society.name.toLowerCase() === state.selectedSociety);

        preSelectedRemptions = filterActivitiesByStatus(societyRedemptions, PENDING);
      }

      return {
        allActivities: props.redemptions,
        filteredActivities: preSelectedRemptions,
        userCanEdit,
        societyRedemptions,
        userRoles,
        showTabs,
        showButtons,
        showCompleteButton,
        showMoreInfoButton,
        initialStatus,
        selectedStatus,
      };
    }
    return { ...state, userRoles: null };
  }

  constructor(props) {
    super(props);
    this.state = {
      allActivities: [],
      userCanEdit: false,
      filteredActivities: [],
      societyRedemptions: [],
      selectedStatus: ALL,
      initialStatus: ALL,
      showUserDetails: true,
      showLocation: true,
      showButtons: false,
      showMoreInfoButton: false,
      showCompleteButton: false,
      showPoints: true,
      showAmount: true,
      selectedSociety: 'istelle',
      selectedRedemption: {},
      showTabs: false,
      showModal: false,
      statuses: [ALL, PENDING, REJECTED, APPROVED],
    };
  }

  /**
   * @name componentDidMount
   * @summary Lifecycle method called when component is mounted
   */
  componentDidMount() {
    const { societyName } = this.props;
    const reference = this.setPathReference(societyName);
    this.props.fetchRedemption(reference);
  }

  /**
   * @name componentDidUpdate
   * @summary Lifecycle method called when there are updates
   * @param {Object} prevProps
   */
  componentDidUpdate() {
    const { societyName } = this.props;
    if (this.state.userRoles == null) {
      const reference = this.setPathReference(societyName);
      this.props.fetchRedemption(reference);
    }
  }

  /**
   * @name setPathReference
   * @summary returns modifier for the fetchRedemption url depending on role
   * @param {String} societyName society name
   * @returns {String} url modifier
   */
  setPathReference = societyName => (this.state.userRoles &&
    hasAllowedRole(this.state.userRoles, STAFF_USERS) ? 'full' : societyName);

  /**
   * @name changeFilterHandler
   * @summary whether or not to use custom filter handler
   * @returns {Boolean} whether or not to use custom filter handler
   */
  changeFilterHandler = () => hasAllowedRole(this.state.userRoles, [CIO, SUCCESS_OPS, FINANCE]);

  /**
   * @name filterActivities
   * Filters state based on the selectedStatus
   * @memberof Redemptions
   */
  filterActivities = (status) => {
    this.setState({
      filteredActivities: filterActivities(status, this.state).filteredActivities,
      selectedStatus: status,
    });
  };

  /**
   * @name filterRedemptions
   * @summary filters redemptions based on status
   */
  filterRedemptions = (event, status) => {
    event.preventDefault();
    let filterResult = filterActivitiesByStatus(this.state.societyRedemptions, status);
    if (status.toLowerCase() === ALL) {
      filterResult = this.state.societyRedemptions;
    }

    this.setState({
      filteredActivities: filterResult,
      selectedStatus: status,
    });
  }

  /**
   * @name handleChangeTab
   * @summary states appropriate state values when a specific society is selected
   */
  handleChangeTab = (event, title) => {
    event.preventDefault();
    const filteredRedemptions = this.state.allActivities
      .filter(red => red.society.name.toLowerCase() === title.toLowerCase());
    const pendingRedemptions = filterActivitiesByStatus(filteredRedemptions, PENDING);
    this.setState({
      filteredActivities: pendingRedemptions,
      societyRedemptions: filteredRedemptions,
      selectedSociety: title.toLowerCase(),
      selectedStatus: 'pending',
    });
  }

  /**
   * @name handleClick
   * @param {Boolean} clickAction which button has been clicked
   * @param {String} redemptionId id of clicked redemption request
   * @summary calls verifyRedemption action creator when approve or reject button is clicked
   */
  handleClick = (clickAction, redemptionId) => {
    const {
      APPROVE,
      EDIT,
      REJECT,
      MORE_INFO,
      COMPLETE,
    } = clickActions;

    switch (clickAction) {
    case COMPLETE:
    case APPROVE:
      this.props.verifyRedemption(redemptionId, clickAction);
      break;
    case EDIT:
    case MORE_INFO:
    case REJECT:
    {
      const selectedRedemption = this.state.filteredActivities.find(r => r.id === redemptionId);
      selectedRedemption.rejectClicked = clickAction === REJECT;
      this.setState({
        showModal: true,
        selectedRedemption,
      });
      break;
    }
    default:
      break;
    }
    return null;
  }

  /**
   * @name deselectRedemption
   * @summary removes selected item from state and closes the modal
   */
  deselectRedemption = () => {
    this.setState({
      selectedRedemption: {},
      showModal: false,
    });
  }

  /**
   * @name updateSelectedItem
   * @param {Object} newValues updated values
   * @summary updates selectedItem values when changed
   */
  updateSelectedRedemption = (newValues) => {
    const { center, points, reason } = newValues;
    this.setState({
      selectedRedemption: {
        ...this.state.selectedRedemption,
        value: points,
        name: reason,
        center: { name: center },
      },
    });
  }

  /**
   * @name renderRedemptionsContent
   * @param {Object} filteredActivities array of redemptions to display
   * @returns Masonry Layout component to display redemptions
   */
  renderRedemptionsContent = (filteredActivities) => {
    const { hasError, requesting, societyName } = this.props;
    const {
      showPoints,
      showUserDetails,
      showLocation,
      showButtons,
      showMoreInfoButton,
      showAmount,
      selectedStatus,
      userCanEdit,
      showCompleteButton,
    } = this.state;

    if (requesting) {
      return (<Loader />);
    } else if (!requesting && !filteredActivities.length) {
      return (
        <ErrorMessage
          message={`No${selectedStatus !== ALL ? (` ${selectedStatus}`) : ''} redemptions`}
        />
      );
    } else if (!requesting && hasError) {
      return (
        <ErrorMessage
          icon={exclamationIcon}
          message='An error occured while fetching your data.'
          param={societyName}
          retry={this.props.fetchRedemption}
        />);
    }
    return (
      <MasonryLayout
        items={
          filteredActivities.map((activity) => {
            const {
              id,
              center,
              createdAt,
              name,
              value,
              status,
            } = activity;
            return (<ActivityCard
              id={id}
              center={center.name}
              date={dateFormatter(createdAt)}
              description={name}
              points={value}
              status={status}
              showAmount={showAmount}
              showButtons={showButtons}
              showMoreInfoButton={showMoreInfoButton}
              showCompleteButton={showCompleteButton}
              showLocation={showLocation}
              showPoints={showPoints}
              showUserDetails={showUserDetails}
              handleClick={this.handleClick}
              userCanEdit={userCanEdit}
            />);
          })
        }
      />
    );
  }

  /**
   * @name Redemptions
   * @summary Renders the Redemptions page
   * @return React node that displays the Redemptions page
   */
  render() {
    const {
      filteredActivities,
      selectedStatus,
      showTabs,
      selectedSociety,
      selectedRedemption,
      statuses,
      showModal,
    } = this.state;

    return (
      <Page
        selectedItem={selectedRedemption}
        deselectItem={this.deselectRedemption}
        showModal={showModal}
        updateSelectedItem={this.updateSelectedRedemption}
      >
        <div className='mainContent'>
          <div className='RecentRedemptions'>
            <PageHeader
              title='Recent Redemptions'
              selectedStatus={selectedStatus}
              selectedSociety={selectedSociety}
              filterActivities={this.filterActivities}
              userRoles={this.props.userRoles}
              showTabs={showTabs}
              tabs={tabs}
              handleChangeTab={this.handleChangeTab}
              filterRedemptions={this.filterRedemptions}
              changeFilterHandler={this.changeFilterHandler}
              statuses={statuses}
            />
            <div className='activities'>
              {this.renderRedemptionsContent(filteredActivities)}
            </div>
          </div>
        </div>
        <aside className='sideContent'>
          <Stats
            stats={statsGenerator(filteredActivities, 'Pending redemptions', 'Total points')}
          />
        </aside>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  const { redeemPointsInfo, userProfile } = state;
  return {
    redemptions: redeemPointsInfo.redemptions,
    hasError: redeemPointsInfo.hasError,
    requesting: redeemPointsInfo.requesting,
    societyName: userProfile.info.society.name,
    userRoles: Object.keys(userProfile.info.roles),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchRedemption: societyName => dispatch(fetchRedemption(societyName)),
  verifyRedemption: (redemptionId, clickAction) => dispatch(verifyRedemption(redemptionId, clickAction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redemptions);
