// third party libraries
import React from 'react';
import { connect } from 'react-redux';
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
import { fetchRedemption, verifyRedemption } from '../actions/redeemPointsAction';
import { openModal } from '../actions/showModalActions';

// helpers
import dateFormatter from '../helpers/dateFormatter';
import { hasAllowedRole } from '../helpers/authentication';
import statsGenerator from '../helpers/statsGenerator';
import filterActivitiesByStatus from '../helpers/filterActivitiesByStatus';

// constants
import { VERIFICATION_USERS, SUCCESS_OPS, CIO, SOCIETY_PRESIDENT, STAFF_USERS, FINANCE } from '../constants/roles';
import { ALL, APPROVED, PENDING, REJECTED, COMPLETED } from '../constants/statuses';
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
    redemptions: [],
    openModal: () => {},
    history: {
      location: {
        pathname: '',
      },
    },
  }

  /**
   * @name propTypes
   */
  static propTypes = {
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }),
    hasError: PropTypes.bool,
    requesting: PropTypes.bool,
    societyName: PropTypes.string,
    fetchRedemption: PropTypes.func.isRequired,
    verifyRedemption: PropTypes.func.isRequired,
    userRoles: PropTypes.arrayOf(PropTypes.string),
    redemptions: PropTypes.arrayOf(PropTypes.shape({})),
    openModal: PropTypes.func,
  }

  /**
   * @name getDerivedStateFromProps
   * @summary Lifecycle method that returns state only when there is a change in props
   * @param {Object} props
   * @param {Object} state
   */
  static getDerivedStateFromProps(props, state) {
    const { redemptions, societyName, userRoles } = props;
    const { selectedSociety } = state;
    if (userRoles.length) {
      const showButtons = hasAllowedRole(userRoles, VERIFICATION_USERS);
      const showCompleteButton = hasAllowedRole(userRoles, [FINANCE]);
      const userCanEdit = hasAllowedRole(userRoles, [SOCIETY_PRESIDENT]);
      let preSelectedRemptions;
      let {
        selectedStatus,
        showTabs,
      } = state;

      // state values for cio/success ops role
      if (hasAllowedRole(userRoles, [CIO, SUCCESS_OPS])) {
        showTabs = true;
        selectedStatus = PENDING;
        preSelectedRemptions = filterActivitiesByStatus(redemptions, PENDING)
          .filter(redemption => redemption.society.name.toLowerCase() === selectedSociety.toLowerCase());
      } else if (hasAllowedRole(userRoles, [FINANCE])) {
        showTabs = true;
        selectedStatus = COMPLETED;
        preSelectedRemptions = filterActivitiesByStatus(redemptions, COMPLETED)
          .filter(redemption => redemption.society.name.toLowerCase() === selectedSociety.toLowerCase());
      } else {
        preSelectedRemptions = redemptions
          .filter(redemption => (redemption.society.name.toLowerCase() === societyName.toLowerCase()));
      }

      return {
        filteredActivities: preSelectedRemptions,
        userCanEdit,
        userRoles,
        showTabs,
        showButtons,
        showCompleteButton,
        selectedStatus,
      };
    }
    return { ...state, userRoles: null };
  }

  constructor(props) {
    super(props);
    this.state = {
      userCanEdit: false,
      filteredActivities: [],
      selectedStatus: ALL,
      showUserDetails: true,
      showLocation: true,
      showButtons: false,
      showCompleteButton: false,
      showPoints: true,
      showAmount: true,
      selectedSociety: 'istelle',
      selectedRedemption: {},
      showTabs: false,
      statuses: [ALL, PENDING, REJECTED, APPROVED],
      statsRedemptionStatus: 'All Redemptions',
    };
  }

  /**
   * @name componentDidMount
   * @summary Lifecycle method called when component is mounted
   */
  componentDidMount() {
    const { societyName, history } = this.props;
    const reference = this.setPathReference(societyName);
    this.props.fetchRedemption(reference);
    sessionStorage.setItem('Location', history.location.pathname);
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
   * @name getSocietyRedemptions
   * @summary gets redemptions for a society
   * @returns {Array} redemptions
   */
  getSocietyRedemptions = () => {
    const { redemptions, societyName, userRoles } = this.props;
    const { selectedSociety } = this.state;
    if (hasAllowedRole(userRoles, [SOCIETY_PRESIDENT])) {
      return redemptions
        .filter(redemption => redemption.society.name.toLowerCase() === societyName.toLowerCase());
    }
    return redemptions
      .filter(redemption => redemption.society.name.toLowerCase() === selectedSociety.toLowerCase());
  }

  /**
   * @name filterRedemptions
   * @summary filters redemptions based on status
   */
  filterRedemptions = (status) => {
    const filterStatus = status.toLowerCase();
    let filterResult;
    const societyRedemptions = this.getSocietyRedemptions();
    filterResult = filterActivitiesByStatus(societyRedemptions, filterStatus);
    if (filterStatus === ALL) {
      filterResult = societyRedemptions;
      this.setState(() => ({ statsRedemptionStatus: `${status} Redemptions` }));
    }
    this.setState({
      filteredActivities: filterResult,
      selectedStatus: status,
      statsRedemptionStatus: `${status} Redemptions`,
    });
  }

  /**
   * @name handleChangeTab
   * @summary states appropriate state values when a specific society is selected
   */
  handleChangeTab = (event, title) => {
    event.preventDefault();
    const { userRoles, redemptions } = this.props;
    let selectedStatus;
    let societyRedemptions;
    societyRedemptions = redemptions.filter(red => red.society.name.toLowerCase() === title.toLowerCase());
    if (hasAllowedRole(userRoles, [FINANCE])) {
      selectedStatus = COMPLETED;
      societyRedemptions = filterActivitiesByStatus(societyRedemptions, COMPLETED);
    } else {
      selectedStatus = PENDING;
      societyRedemptions = filterActivitiesByStatus(societyRedemptions, PENDING);
    }
    this.setState({
      filteredActivities: societyRedemptions,
      selectedSociety: title.toLowerCase(),
      selectedStatus,
    });
  }

  /**
   * @name selectRedemption
   * @summary Used to select a redemption
   * @param {string} redemptionId - redemption id
   * @returns void
   */
  selectRedemption = (redemptionId, clickAction) => {
    const selectedRedemption = this.state.filteredActivities.find(r => r.id === redemptionId);
    selectedRedemption.clickAction = clickAction;
    this.props.openModal();
    this.setState({
      selectedRedemption,
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
      COMPLETE,
    } = clickActions;
    switch (clickAction) {
    case COMPLETE:
    case APPROVE:
      this.props.verifyRedemption(redemptionId, clickAction);
      break;
    case EDIT:
    case REJECT:
    {
      this.selectRedemption(redemptionId, clickAction);
      break;
    }
    default:
      return null;
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
    const noRedemptionFoundMsg = 'This redemption does not have a description';
    const { hasError, requesting, societyName } = this.props;
    const {
      showPoints,
      showUserDetails,
      showLocation,
      showButtons,
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
              ownerPhoto,
            } = activity;
            return (<ActivityCard
              id={id}
              center={center.name}
              date={dateFormatter(createdAt)}
              description={name || noRedemptionFoundMsg}
              points={value}
              status={status}
              showAmount={showAmount}
              showButtons={showButtons}
              showCompleteButton={showCompleteButton}
              showLocation={showLocation}
              showPoints={showPoints}
              showUserDetails={showUserDetails}
              handleClick={this.handleClick}
              userCanEdit={userCanEdit}
              ownerPhoto={ownerPhoto}
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
      statsRedemptionStatus,
    } = this.state;
    return (
      <Page
        selectedItem={selectedRedemption}
        deselectItem={this.deselectRedemption}
        updateSelectedItem={this.updateSelectedRedemption}
      >
        <div className='mainContent'>
          <div className='RecentRedemptions'>
            <PageHeader
              title='Recent Redemptions'
              selectedStatus={selectedStatus}
              selectedSociety={selectedSociety}
              userRoles={this.props.userRoles}
              showTabs={showTabs}
              tabs={tabs}
              handleChangeTab={this.handleChangeTab}
              filterActivities={this.filterRedemptions}
              statuses={statuses}
            />
            <div className='activities'>
              {this.renderRedemptionsContent(filteredActivities)}
            </div>
          </div>
        </div>
        <aside className='sideContent'>
          <Stats
            stats={statsGenerator(filteredActivities, statsRedemptionStatus, 'Total points')}
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

export default connect(mapStateToProps, {
  fetchRedemption,
  verifyRedemption,
  openModal,
})(Redemptions);
