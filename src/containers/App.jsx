import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Stats from '../components/sidebar/Stats';
import MyActivities from './MyActivities';
import { getToken, tokenIsValid, isFellow, setSignInError } from '../helpers/authentication';

/**
 * @name App
 * @summary Renders the entire application
 * @return {jsx} React node for the entire application
 */

class App extends Component {
  /**
 * @name propTypes
 * @type {PropType}
 * @param {Object} propTypes - React PropTypes
 * @property {history} items - React router history object
*/
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // retrieve token from cookie
    const token = getToken();
    if (token === null || tokenIsValid(token) === false || isFellow(token) === false) {
      setSignInError();
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <div className='headerBackground' />
        <div className='sidebarWrapper sidebarWrapper--sidebarOpen'>
          <Sidebar />
        </div>
        <main className='mainPage mainPage--sidebarOpen'>
          {/* <div className="coverPhotoWrapper" /> */}
          <div className='pageContent'>
            <Header />
            <div className='contentWrapper'>
              <div className='mainContent'>
                <MyActivities />
              </div>
              <aside className='sideContent'>
                <Stats
                  stats={[
                    {
                      value: '20',
                      name: 'Activities logged',
                    },
                    {
                      value: '1,590',
                      name: 'Points earned',
                    },
                  ]}
                />
              </aside>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
