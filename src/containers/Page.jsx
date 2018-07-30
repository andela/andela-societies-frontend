import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { fetchUserInfo } from '../actions';
import { fetchSocietyInfo } from '../actions/societyInfoActions';
import { changeTitle } from '../actions/pageActions';
import { fetchUserProfile } from '../actions/userProfileActions';
import Header from '../components/header/Header';
import SocietyBanner from '../components/header/SocietyBanner';
import Sidebar from '../components/sidebar/Sidebar';
import LogActivityForm from './forms/LogActivityForm';
import FloatingButton from '../common/FloatingButton';
import UpdateLoader from '../components/loaders/UpdateLoader';
import Modal from '../common/Modal';
import RedeemPointsForm from './forms/RedeemPointsForm';
import CommentsForm from './forms/CommentsForm';

import { STAFF_USERS, SOCIETY_PRESIDENT } from '../../src/constants/roles';

import {
  getToken, tokenIsValid, isFellow,
  setSignInError, decodeToken, getUserInfo,
  hasAllowedRole,
} from '../helpers/authentication';
import pageInfo from '../helpers/pageInfo';

/**
 * @name Page
 * @summary Renders the entire application
 * @return {jsx} React node for the entire application
 */

class Page extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @param {Object} propTypes - React PropTypes
   * @property {Object} history - React router history object
  */
  static propTypes = {
    fetchUserInfo: PropTypes.func.isRequired,
    fetchSocietyInfo: PropTypes.func.isRequired,
    fetchUserProfile: PropTypes.func.isRequired,
    updateSelectedItem: PropTypes.func,
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }).isRequired,
    societyInfo: PropTypes.shape({
      requesting: PropTypes.bool.isRequired,
      error: PropTypes.shape({}).isRequired,
      info: PropTypes.shape({
        name: PropTypes.string.isRequired,
        remainingPoints: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: ReactRouterPropTypes.history,
    changePageTitle: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    profile: PropTypes.shape({
      society: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
    updating: PropTypes.bool,
    deselectItem: PropTypes.func,
    selectedItem: PropTypes.shape({}),
  }

  static defaultProps = {
    categories: [],
    profile: null,
    history: {},
    updating: false,
    selectedItem: {},
    deselectItem: () => { },
    updateSelectedItem: () => { },
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.location.pathname !== '/u/my-activities') {
      return ({
        showModal: props.showModal,
      });
    }
    return state;
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    props.changePageTitle(props.history.location.pathname);
  }

  componentDidMount() {
    const token = getToken();
    const tokenInfo = decodeToken(token);
    if (token === null || tokenIsValid(tokenInfo) === false || isFellow(tokenInfo) === false) {
      setSignInError();
      this.props.history.push({ pathname: '/', search: '?error=unauthorized' });
    }
    this.props.fetchUserInfo(tokenInfo);
    const userId = getUserInfo() && getUserInfo().id;
    this.props.fetchUserProfile(userId);
    if (this.isASocietyPage()) {
      const societyName = this.props.location.pathname.split('/').pop();
      this.props.fetchSocietyInfo(societyName);
    }
  }

  onFabClick = (event) => {
    if (event.type === 'keydown' && event.keyCode !== 13) {
      return;
    }
    if (document && document.body) {
      document.body.classList.add('noScroll');
    }
    this.setState({ showModal: true });
  }

  isASocietyPage = () => (
    this.props.location.pathname.indexOf('society') !== -1
  );

  closeModal = () => {
    if (document && document.body) {
      document.body.classList.remove('noScroll');
    }
    if (this.props.selectedItem) {
      this.props.deselectItem();
    }
    this.setState({ showModal: false });
  }

  renderModal = () => {
    const {
      categories,
      deselectItem,
      location,
      profile,
      selectedItem,
      updateSelectedItem,
    } = this.props;

    const className = this.state.showModal ? 'modal--open' : '';
    let modalContent;
    if (location.pathname === '/u/my-activities') {
      modalContent = categories.length && <LogActivityForm categories={categories} closeModal={this.closeModal} />;
    } else if (location.pathname === '/u/redemptions' &&
      hasAllowedRole(Object.keys(profile.roles), [SOCIETY_PRESIDENT])) {
      modalContent = (
        <RedeemPointsForm
          closeModal={this.closeModal}
          selectedItem={selectedItem}
          deselectItem={deselectItem}
          updateSelectedItem={updateSelectedItem}
        />
      );
    } else if (hasAllowedRole(Object.keys(profile.roles), STAFF_USERS)) {
      modalContent = (
        <CommentsForm
          closeModal={this.closeModal}
          selectedItem={selectedItem}
        />);
    }
    return (
      <Modal close={this.closeModal} className={className}>
        {
          modalContent
        }
      </Modal>
    );
  }

  render() {
    const {
      userInfo,
      societyInfo,
      profile,
      updating,
    } = this.props;
    const userRoles = Object.keys(profile.roles);

    return (
      <Fragment>
        <div className='headerBackground' />
        <div className='sidebarWrapper sidebarWrapper--sidebarOpen'>
          <Sidebar userRoles={userRoles} pageInfo={pageInfo} />
        </div>
        <main className='mainPage mainPage--sidebarOpen'>
          {this.isASocietyPage() ? <SocietyBanner society={societyInfo.info} /> : null}
          {updating && <div className='overlay'><UpdateLoader /></div>}
          <div className='pageContent'>
            <Header
              history={this.props.history}
              userInfo={userInfo}
              profile={profile}
              societyBanner={this.isASocietyPage()}
            />
            <div className={`contentWrapper ${(this.isASocietyPage() ? 'contentWrapper--society' : '')}`}>
              {this.props.children}
            </div>
          </div>
        </main>
        {this.renderModal()}
        {
          this.state.showModal || hasAllowedRole(userRoles, STAFF_USERS) || userRoles.length === 0 ?
            ''
            : <FloatingButton onClick={this.onFabClick} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const updating = state.societyActivities.updating || state.redeemPointsInfo.updating;
  return ({
    userInfo: state.userInfo,
    societyInfo: state.societyInfo,
    profile: state.userProfile.info,
    updating,
  });
};

const mapDispatchToProps = dispatch => ({
  changePageTitle: history => dispatch(changeTitle(history)),
  fetchUserInfo: tokenInfo => (
    dispatch(fetchUserInfo(tokenInfo))
  ),
  fetchSocietyInfo: name => dispatch(fetchSocietyInfo(name)),
  fetchUserProfile: userId => dispatch(fetchUserProfile(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));
