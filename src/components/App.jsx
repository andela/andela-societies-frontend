import React from 'react';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

import MyActivities from '../containers/MyActivities';

/**
 * @name App
 * @summary Renders the entire application
 * @return {jsx} React node for the entire application
 */
const App = () => (
  <div>
    <div className="headerBackground" />
    <div className="sidebarWrapper sidebarWrapper--sidebarOpen">
      <Sidebar />
    </div>
    <main className="mainPage mainPage--sidebarOpen">
      {/* <div className="coverPhotoWrapper" /> */}
      <div className="pageContent">
        <Header />
        <div className="contentWrapper">
          <div className="mainContent">
            <MyActivities />
          </div>
          <aside className="sideContent" />
        </div>
      </div>
    </main>
  </div>
);

export default App;
