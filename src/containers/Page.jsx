import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { fetchUserInfo } from '../actions';
import { fetchSocietyInfo } from '../actions/societyInfoActions';
import { changeTitle } from '../actions/pageActions';
import Header from '../components/header/Header';
import SocietyBanner from '../components/header/SocietyBanner';
import Sidebar from '../components/sidebar/Sidebar';
import LogActivityForm from './forms/LogActivityForm';
import FloatingButton from '../common/FloatingButton';
import Modal from '../common/Modal';

import { getToken, tokenIsValid, isFellow, setSignInError, decodeToken } from '../helpers/authentication';

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
    history: ReactRouterPropTypes.history.isRequired,
    changePageTitle: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    props.changePageTitle(props.history.location.pathname);
  }

  componentWillMount() {
    // retrieve token from cookie
    const token = getToken();
    const tokenInfo = decodeToken(token);
    if (token === null || tokenIsValid(tokenInfo) === false || isFellow(tokenInfo) === false) {
      setSignInError();
      this.props.history.push({ pathname: '/', search: '?error=unauthorized' });
    }
    this.props.fetchUserInfo(tokenInfo);
  }

  componentDidMount() {
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
    this.setState({ showModal: false });
  }

  renderModal = () => {
    const className = this.state.showModal ? 'modal--open' : '';

    return (
      <Modal close={this.closeModal} className={className}>
        <LogActivityForm />
      </Modal>
    );
  }

  render() {
    const { userInfo, societyInfo } = this.props;

    return (
      <Fragment>
        <div className='headerBackground' />
        <div className='sidebarWrapper sidebarWrapper--sidebarOpen'>
          <Sidebar />
        </div>
        <main className='mainPage mainPage--sidebarOpen'>
          {this.isASocietyPage() ? <SocietyBanner society={societyInfo.info} /> : null}
          <div className='pageContent'>
            <Header
              history={this.props.history}
              userInfo={userInfo}
              societyBanner={this.isASocietyPage()}
            />
            <div className={`contentWrapper ${(this.isASocietyPage() ? 'contentWrapper--society' : '')}`}>
              {this.props.children}
            </div>
          </div>
        </main>
        {this.renderModal()}
        {
          this.state.showModal ?
            ''
            : <FloatingButton onClick={this.onFabClick} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  societyInfo: state.societyInfo,
});

const mapDispatchToProps = dispatch => ({
  changePageTitle: history => dispatch(changeTitle(history)),
  fetchUserInfo: tokenInfo => (
    dispatch(fetchUserInfo(tokenInfo))
  ),
  fetchSocietyInfo: name => dispatch(fetchSocietyInfo(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));
