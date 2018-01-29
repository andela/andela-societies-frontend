import React from 'react';

import HomeIcon from '../../svgIcons/menuIcons/Home';
import MyActivitiesIcon from '../../svgIcons/menuIcons/MyActivities';
import VerifyActivitiesIcon from '../../svgIcons/menuIcons/VerifyActivities';
import RedemptionsIcon from '../../svgIcons/menuIcons/Redemptions';
import InvictusIcon from '../../svgIcons/societyIcons/Invictus';
import IstelleIcon from '../../svgIcons/societyIcons/Istelle';
import SparksIcon from '../../svgIcons/societyIcons/Sparks';
import PhoenixIcon from '../../svgIcons/societyIcons/Phoenix';

import './Sidebar.scss';
import logo from './andelaLogoWhite.png';

const pages = [
  {
    url: '/',
    label: 'Home',
    icon: HomeIcon,
  },
  {
    url: '/',
    label: 'My Activities',
    icon: MyActivitiesIcon,
  },
  {
    url: '/',
    label: 'Verify Activities',
    icon: VerifyActivitiesIcon,
  },
  {
    url: '/',
    label: 'Redemptions',
    icon: RedemptionsIcon,
  },
];

const societies = [
  {
    url: '/',
    label: 'iStelle',
    icon: IstelleIcon,
  },
  {
    url: '/',
    label: 'Invictus',
    icon: InvictusIcon,
  },
  {
    url: '/',
    label: 'Sparks',
    icon: SparksIcon,
  },
  {
    url: '/',
    label: 'Phoenix',
    icon: PhoenixIcon,
  },
];

const renderMenuItem = menu => (
  <a href={menu.url} className="sidebar__navItem" key={Math.random()}>
    <span className="sidebar__navIcon">
      <menu.icon />
    </span>
    <span className="sidebar__navLabel">{ menu.label }</span>
  </a>
);

export default () => (
  <aside className="sidebar">
    <header className="sidebar__header">
      <span className="sidebar__logoWrapper" style={{ backgroundImage: `url(${logo})` }} />
      <span className="sidebar__appName">Andela Societies</span>
    </header>
    <nav className="sidebar__nav">
      <div className="sidebar__navGroup">
        { pages.map(renderMenuItem) }
      </div>
      <div className="sidebar__navGroup">
        <span className="sidebar__navGroupHeader">Societies</span>
        { societies.map(renderMenuItem) }
      </div>
    </nav>
  </aside>
);
