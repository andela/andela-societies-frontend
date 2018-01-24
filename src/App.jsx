import React from 'react';

import Sidebar from './components/sidebar/Sidebar.component';

import './App.scss';

export const App = () => (
  <div>
    <div className="headerBackground" />
    <div className="sidebarWrapper sidebarWrapper--sidebarOpen">
      <Sidebar />
    </div>
    <main className="mainPage mainPage--sidebarOpen">
      {/* <div className="coverPhotoWrapper" /> */}
      <div className="pageContent">
        <div className="headerWrapper">
          <div className="leftHeader leftHeader--whiteText" />
          <div className="rightHeader" />
        </div>
        <div className="contentWrapper">
          <div className="mainContent" />
          <aside className="sideContent" />
        </div>
      </div>
    </main>
  </div>
);

export default App;
