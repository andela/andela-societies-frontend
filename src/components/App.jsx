import React from 'react';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

import MyActivities from '../containers/MyActivities';

/**
 * Renders the entire application
 */
export const App = () => (
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
