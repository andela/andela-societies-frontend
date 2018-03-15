import React from 'react';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
<<<<<<< HEAD
=======
import FAB from './sidebar/FAB';

>>>>>>> FAB Element at the bottom of the page
import Stats from './sidebar/Stats';
import MyActivities from '../containers/MyActivities';

/**
 * @name App
 * @summary Renders the entire application
 * @return {jsx} React node for the entire application
 */
const App = () => (
  <React.Fragment>
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> FAB Element at the bottom of the page
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
<<<<<<< HEAD
=======
          <aside className='sideContent' />
>>>>>>> Refactor code to adhere to the rules in the description
=======
>>>>>>> FAB Element at the bottom of the page
        </div>
      </div>
    </main>
    <FAB />
  </React.Fragment>
);

export default App;
