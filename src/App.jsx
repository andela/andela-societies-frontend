import React from 'react';

import Header from './components/header/Header.component';
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
        <Header />
        <div className="contentWrapper">
          <div className="mainContent" />
          <aside className="sideContent" />
        </div>
      </div>
    </main>
  </div>
);

export default App;
