import React from 'react';
import { connect } from 'react-redux';

// third party libraries
import PropTypes from 'prop-types';

// components
import ActivityCard from '../components/redemptions/RedemptionCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';

// thunk
import { fetchRedemption } from '../actions/redeemPointsAction';

// helpers
import dateFormatter from '../helpers/dateFormatter';
import filterActivities from '../helpers/filterActivities';

// fixtures
import stats from '../fixtures/stats';

class Redemptions extends React.Component {
  /**
   * @name defaultProps
   */
  static defaultProps = {
    societyId: '',
    hasError: false,
  }

  /**
   * @name propTypes
   */
  static propTypes = {
    hasError: PropTypes.bool,
    requesting: PropTypes.bool.isRequired,
    societyId: PropTypes.string,
    fetchRedemption: PropTypes.func.isRequired,
  }

  /**
   * @name getDerivedStateFromProps
   * @summary Lifecycle method that returns state only when there is a change in props
   * @param {Object} props
   * @param {Object} state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.redemptions !== state.allActivities && props.redemptions.length !== 0) {
      return {
        allActivities: props.redemptions,
        filteredActivities: props.redemptions,
      };
    }
    return state;
  }

  constructor(props) {
    super(props);
    this.state = {
      allActivities: [],
      filteredActivities: [],
      selectedStatus: 'All',
      initialStatus: 'All',
    };
  }

  componentDidMount() {
    const { societyId } = this.props;
    if (societyId) this.props.fetchRedemption(societyId);
  }

  /**
   * @name componentDidUpdate
   * @summary Lifecycle method called when there are updates
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    const { societyId } = this.props;
    if (prevProps.societyId !== societyId) {
      this.props.fetchRedemption(societyId);
    }
  }

  getRedemptionsContent = (filteredActivities) => {
    const { hasError, requesting } = this.props;
    if (requesting) {
      return (<h3>Loading... </h3>);
    } else if (!requesting && hasError) {
      return (<h3>There seems to be an error processing your request</h3>);
    }
    return (
      <MasonryLayout
        items={
          filteredActivities.map((activity) => {
            const {
              id,
              createdAt,
              reason,
              pointsRedeemed,
              status,
            } = activity;
            return (<ActivityCard
              id={id}
              date={dateFormatter(createdAt)}
              description={reason}
              points={pointsRedeemed}
              status={status}
            />);
          })
        }
      />
    );
  }

  /**
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
   * @name Redemptions
   * @summary Renders the Redemptions page
   * @return React node that displays the Redemptions page
   */
  render() {
    const { filteredActivities, selectedStatus } = this.state;
    return (
      <Page>
        <div className='mainContent'>
          <div className='RecentRedemptions'>
            <PageHeader
              title='Recent Redemptions'
              selectedStatus={selectedStatus}
              filterActivities={this.filterActivities}
            />
            <div className='activities'>
              {this.getRedemptionsContent(filteredActivities)}
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
  };
};

const mapDispatchToProps = dispatch => ({
  fetchRedemption: societyId => dispatch(fetchRedemption(societyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redemptions);
