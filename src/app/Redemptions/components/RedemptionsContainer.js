import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dashboardActions from '../../Dashboard/operations/actions';
import societyActions from '../../Societies/operations/actions';
import {
  getUserInfo, getToken, dollarsToPointsConverter, search,
} from '../../utils';

import RedeemPointsModal from './RedeemPointsDialogComponent';
import RedemptionsComponent from './RedemptionsComponent';
import LogPointsComponent from '../../Dashboard/components/LogPointsModalContainer';
import {
  ButtonComponent,
  LoaderComponent,
  SocietyStatsComponent,
  ToastMessageComponent,
} from '../../common/components';

export class RedemptionsContainer extends Component {
  static defaultProps = {
    society: {},
    searchText: '',
    societyName: '',
    createRedemption: null,
    fetchUserActivites: null,
    fetchSocietyInfoRequest: null,
    fetchSocietyRedemptionsRequest: null,
    successMessage: '',
    showToastMessage: false,
  };

  static propTypes = {
    society: PropTypes.shape({}),
    searchText: PropTypes.string,
    societyName: PropTypes.string,
    createRedemption: PropTypes.func,
    fetchUserActivites: PropTypes.func,
    fetchSocietyInfoRequest: PropTypes.func,
    fetchSocietyRedemptionsRequest: PropTypes.func,
    successMessage: PropTypes.string,
    showToastMessage: PropTypes.bool,
  };

  initialState = {
    date: '',
    errors: {},
    reason: '',
    points: null,
    center: '',
    usdValue: '',
    openRedeemPointsModal: false,
  };

  state = {
    ...this.initialState,
    logPoints: false,
  };

  initialState = {
    date: '',
    errors: {},
    reason: '',
    points: null,
    center: '',
    usdValue: '',
    openRedeemPointsModal: false,
  };

  state = {
    ...this.initialState,
    logPoints: false,
  };

  componentDidMount() {
    const {
      fetchSocietyRedemptionsRequest, fetchSocietyInfoRequest, societyName, fetchUserActivites,
    } = this.props;
    const token = getToken();
    const userInfo = getUserInfo(token);
    fetchUserActivites(userInfo.id);
    fetchSocietyInfoRequest(societyName.toLowerCase());
    fetchSocietyRedemptionsRequest(societyName.toLowerCase());
  }

  componentDidUpdate(prevProps) {
    const { fetchSocietyRedemptionsRequest, fetchSocietyInfoRequest, societyName } = this.props;
    if (prevProps.societyName !== societyName && !prevProps.society[societyName.toLowerCase()].redemptions.length) {
      fetchSocietyInfoRequest(societyName.toLowerCase());
      fetchSocietyRedemptionsRequest(societyName.toLowerCase());
    }
  }

  showRedeemPointsModal = (bool) => {
    this.setState({ openRedeemPointsModal: bool });
  };

  logPointsModal = () => {
    const { logPoints } = this.state;
    this.setState({
      logPoints: !logPoints,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'usdValue') {
      this.setState({ points: dollarsToPointsConverter(value) });
    }
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: '',
      },
    }));
  };

  validateFormFields = (values) => {
    const errors = {};
    const required = ['date', 'reason', 'usdValue', 'center'];
    required.forEach((name) => {
      if (!values[name] || values[name] === '' || values[name] === 0) {
        errors[name] = 'This field is required';
      }
    });
    return errors;
  };

  handleRedemptionSubmit = () => {
    // action to create a redemption
    const {
      date, reason, center, points, usdValue,
    } = this.state;
    const { createRedemption, societyName } = this.props;
    const errors = this.validateFormFields({
      date,
      reason,
      center,
      usdValue,
    });
    if (Object.keys(errors) && Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    createRedemption(
      {
        date,
        reason,
        points,
        center,
      },
      societyName.toLowerCase(),
    );
    this.setState({ ...this.initialState });
  };

  render() {
    const {
      date, errors, center, points, reason, usdValue, openRedeemPointsModal, logPoints,
    } = this.state;
    const {
      society, societyName, successMessage, showToastMessage, searchText,
    } = this.props;
    let redemptionsHtml = <LoaderComponent className='loader' />;
    let logPointsComponent;
    if (logPoints) {
      logPointsComponent = <LogPointsComponent open={logPoints} close={this.logPointsModal} />;
    }
    if (societyName) {
      const {
        usedPoints, pointsEarned, remainingPoints, activitiesLogged, redemptions,
      } = society[
        societyName.toLowerCase()
      ];
      redemptionsHtml = (
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
            <h3 className='user-dashboard__title'>Latest Activities</h3>
            <ToastMessageComponent className='success' show={showToastMessage}>
              <div>
                <span className='success-message'>{successMessage}</span>
                <span className='checkmark'>
                  <div className='checkmark_stem' />
                  <div className='checkmark_kick' />
                </span>
              </div>
            </ToastMessageComponent>
            <div>
              <ButtonComponent className='button__add button__points' onClick={this.logPointsModal}>
                <span className='fa fa-plus' />
                <span>Log Points</span>
              </ButtonComponent>
              <ButtonComponent
                className='button__add button__redemption'
                onClick={() => this.showRedeemPointsModal(true)}
              >
                <span className='fa fa-plus' />
                <span>New Redemption</span>
              </ButtonComponent>
              <ButtonComponent className='button__filter'>
                <span>Filter</span>
                <span className='fa fa-filter' />
              </ButtonComponent>
            </div>
          </div>
          <RedeemPointsModal
            date={date}
            errors={errors}
            points={points}
            reason={reason}
            center={center}
            usdValue={usdValue}
            open={openRedeemPointsModal}
            onChange={this.handleChange}
            onClose={() => this.showRedeemPointsModal(false)}
            handleRedemptionSubmit={this.handleRedemptionSubmit}
          />
          {logPointsComponent}
          <RedemptionsComponent activities={search(searchText, redemptions)} />
        </div>
      );
    }
    return redemptionsHtml;
  }
}

const mapStateToProps = ({ society, dashboard, navbar }) => ({
  society,
  searchText: navbar.searchText,
  societyName: dashboard.society,
  successMessage: dashboard.activity.message,
  showToastMessage: dashboard.showToastMessage,
});

const mapDispatchToProps = {
  createRedemption: societyActions.createRedemptionRequest,
  fetchUserActivites: dashboardActions.fetchUserActivitiesRequest,
  fetchSocietyInfoRequest: societyActions.fetchSocietyInfoRequest,
  fetchSocietyRedemptionsRequest: societyActions.fetchSocietyRedemptionsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RedemptionsContainer);
