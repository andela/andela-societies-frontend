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

// thunk
import { fetchRedemption } from '../actions/redeemPointsAction';
import { verifyRedemption } from '../actions/verifyRedemptionActions';

// helpers
import dateFormatter from '../helpers/dateFormatter';
import filterActivities from '../helpers/filterActivities';
import { hasAllowedRole } from '../helpers/authentication';
import filterActivitiesByStatus from '../helpers/filterActivitiesByStatus';

// constants
import { VERIFICATION_USERS, SUCCESS_OPS, CIO, STAFF_USERS } from '../constants/roles';
import { ALL, APPROVED, PENDING, REJECTED } from '../constants/statuses';

// fixtures
import stats from '../fixtures/stats';
import tabs from '../fixtures/tabs';
import exclamationIcon from '../fixtures/icons';

class Redemptions extends React.Component {
  /**
   * @name defaultProps
   */
  static defaultProps = {
    societyId: '',
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
    societyId: PropTypes.string,
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
    if (props.redemptions !== state.allActivities && props.redemptions.length !== 0) {
      const userRoles = props.userRoles ? props.userRoles : [];
      const showButtons = userRoles.length > 0 && hasAllowedRole(userRoles, VERIFICATION_USERS);
      let preSelectedRemptions = props.redemptions;
      let {
        initialStatus,
        selectedStatus,
        showTabs,
        societyRedemptions,
      } = state;

      // state values for cio/success ops role
      if (hasAllowedRole(userRoles, [CIO, SUCCESS_OPS])) {
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
        societyRedemptions,
        userRoles,
        showTabs,
        showButtons,
        initialStatus,
        selectedStatus,
      };
    }
    return state;
  }

  constructor(props) {
    super(props);
    this.state = {
      allActivities: [],
      filteredActivities: [],
      societyRedemptions: [],
      selectedStatus: ALL,
      initialStatus: ALL,
      showUserDetails: true,
      showLocation: true,
      showButtons: false,
      showPoints: true,
      showAmount: true,
      selectedSociety: 'istelle',
      selectedRedemption: {},
      showTabs: false,
      openModal: false,
      statuses: [ALL, PENDING, REJECTED, APPROVED],
    };
  }

  /**
   * @name componentDidMount
   * @summary Lifecycle method called when component is mounted
   */
  componentDidMount() {
    const { societyId } = this.props;
    const reference = this.setPathReference(societyId);
    this.props.fetchRedemption(reference);
  }

  /**
   * @name componentDidUpdate
   * @summary Lifecycle method called when there are updates
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps, prevState) {
    const { societyId } = this.props;
    const { allActivities } = this.state;
    if (prevState.allActivities.length !== allActivities.length) {
      const reference = this.setPathReference(societyId);
      this.props.fetchRedemption(reference);
    }
  }

  /**
   * @name setPathReference
   * @summary returns modifier for the fetchRedemption url depending on role
   * @param {String} societyId society id
   * @returns {String} url modifier
   */
  setPathReference = societyId => (this.state.userRoles &&
    hasAllowedRole(this.state.userRoles, STAFF_USERS) ? 'full' : societyId);

  /**
   * @name changeFilterHandler
   * @summary whether or not to use custom filter handler
   * @returns {Boolean} whether or not to use custom filter handler
   */
  changeFilterHandler = () => hasAllowedRole(this.state.userRoles, [CIO, SUCCESS_OPS]);

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
   * @name toggleOpenModal
   * @summary open/closes modal and sets value of selectedRedemption
   * @param {Object} redemption that has been clicked
   */
  toggleOpenModal = (redemption) => {
    const selectedRedemption = this.state.openModal ? {} : redemption;
    this.setState(currentState => ({
      openModal: !currentState.openModal,
      selectedRedemption,
    }));
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
   * @param {Boolean} isApproved whether or not a redemption request has been approved
   * @param {String} redemptionId id of clicked redemption request
   * @summary calls verifyRedemption action creator when approve or reject button is clicked
   */
  handleClick = (isApproved, redemptionId) => {
    if (!isApproved) {
      const redemption = this.state.filteredActivities.find(r => r.id === redemptionId);
      this.toggleOpenModal(redemption);
    } else {
      this.props.verifyRedemption(redemptionId, isApproved);
    }
  }

  /**
   * @name renderRedemptionsContent
   * @param {Object} filteredActivities array of redemptions to display
   * @returns Masonry Layout component to display redemptions
   */
  renderRedemptionsContent = (filteredActivities) => {
    const { hasError, requesting, societyId } = this.props;
    const {
      showPoints,
      showUserDetails,
      showLocation,
      showButtons,
      showAmount,
      selectedStatus,
    } = this.state;

    if (requesting) {
      return (<h3>Loading... </h3>);
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
          param={societyId}
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
              reason,
              pointsRedeemed,
              status,
            } = activity;
            return (<ActivityCard
              id={id}
              center={center}
              date={dateFormatter(createdAt)}
              description={reason}
              points={pointsRedeemed}
              status={status}
              showAmount={showAmount}
              showButtons={showButtons}
              showLocation={showLocation}
              showPoints={showPoints}
              showUserDetails={showUserDetails}
              handleClick={this.handleClick}
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
      openModal,
    } = this.state;

    return (
      <Page openModal={openModal} toggleOpenModal={this.toggleOpenModal} selectedItem={selectedRedemption} >
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
            stats={stats}
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
    societyId: userProfile.info.society.id,
    userRoles: Object.keys(userProfile.info.roles),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchRedemption: societyId => dispatch(fetchRedemption(societyId)),
  verifyRedemption: (redemptionId, isApproved) => dispatch(verifyRedemption(redemptionId, isApproved)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redemptions);
