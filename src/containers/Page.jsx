import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { fetchUserInfo } from '../actions';
import { changeTitle } from '../actions/pageActions';
import Header from '../components/header/Header';
import SocietyBanner from '../components/header/SocietyBanner';
import Sidebar from '../components/sidebar/Sidebar';
import FloatingActionButton from '../components/sidebar/FloatingActionButton';
import Modal from './Modal';

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
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
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
      showSocietyBanner: false,
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

    if (this.props.location.pathname.split('/')[1] === 'society') {
      this.setState(prevState => ({ showSocietyBanner: !prevState.showSocietyBanner }));
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
        <div />
      </Modal>
    );
  }

  render() {
    const { userInfo } = this.props;
    const society = {
      name: 'Invictus',
      points: 2021,
      /* eslint-disable max-len */
      image: 'https://photos.smugmug.com/Archives/Kenya/Internal-Events/Andela-Kenya-Turns-2/i-n6gSgRB/1/53c1e45f/4K/AndelaKenya2ndAnniversary_10-4K.jpg',
      /* eslint-enable max-len */
    };

    return (
      <Fragment>
        <div className='headerBackground' />
        <div className='sidebarWrapper sidebarWrapper--sidebarOpen'>
          <Sidebar />
        </div>
        <main className='mainPage mainPage--sidebarOpen'>
          {this.state.showSocietyBanner ? <SocietyBanner society={society} /> : null}
          <div className='pageContent'>
            <Header
              history={this.props.history}
              userInfo={userInfo}
              societyBanner={this.state.showSocietyBanner}
            />
            <div className={`contentWrapper ${(this.state.showSocietyBanner ? 'contentWrapper--society' : '')}`}>
              {this.props.children}
            </div>
          </div>
        </main>
        {this.renderModal()}
        {
          this.state.showModal ?
            ''
            : <FloatingActionButton onClick={this.onFabClick} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  changePageTitle: history => dispatch(changeTitle(history)),
  fetchUserInfo: tokenInfo => (
    dispatch(fetchUserInfo(tokenInfo))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));
