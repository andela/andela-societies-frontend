import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../operations';

import { getUserInfo, getToken } from '../../utils/tokenIsValid';
import { LogoComponent, NavItemComponent } from '../../common/components/index';

/**
 * @name SidebarContainer
 * @description used to navigate to different pages
 */
export class SidebarContainer extends Component {
  static defaultProps = {
    className: '',
    userRole: {},
    fetchUserRole: null,
    toggleSidebarState: null,
  };

  static propTypes = {
    userRole: PropTypes.shape({}),
    className: PropTypes.string,
    fetchUserRole: PropTypes.func,
    toggleSidebarState: PropTypes.func,
  };

  componentDidMount() {
    const { fetchUserRole } = this.props;
    // action to get user role
    const token = getToken();
    const userInfo = getUserInfo(token);
    fetchUserRole(userInfo.id);
  }

  render() {
    const { className, toggleSidebarState, userRole } = this.props;
    let navItemHtml;
    if (userRole && Object.keys(userRole).includes('society secretary')) {
      navItemHtml = (
        <NavItemComponent
          route='verify-activities'
          iconClassName='sidebar_nav-icon outlinedCheckmark'
          labelClassName='sidebar_nav-label'
          navItemClassName='sidebar_nav-item'
        />
      );
    } else if (userRole && Object.keys(userRole).includes('society president')) {
      navItemHtml = (
        <NavItemComponent
          route='redemptions'
          iconClassName='sidebar_nav-icon outlinedCheckmark'
          labelClassName='sidebar_nav-label'
          navItemClassName='sidebar_nav-item'
        />
      );
    } else if (userRole && Object.keys(userRole).includes('success ops')) {
      navItemHtml = (
        <>
          <NavItemComponent
            route='activities'
            iconClassName='sidebar_nav-icon outlinedCheckmark'
            labelClassName='sidebar_nav-label'
            navItemClassName='sidebar_nav-item'
          />
          <NavItemComponent
            route='budget'
            iconClassName='sidebar_nav-icon outlinedCheckmark'
            labelClassName='sidebar_nav-label'
            navItemClassName='sidebar_nav-item'
          />
        </>
      );
    }
    return (
      <nav className={`${className}`}>
        <LogoComponent styles='sidebar__header' logoClassType='logo__image--white' />
        <i aria-hidden='true' onClick={toggleSidebarState} className='fa fa-times fa-2x close-btn' />
        <nav className='sidebar_nav'>
          <NavItemComponent
            route='dashboard'
            iconClassName='sidebar_nav-icon dashboard'
            labelClassName='sidebar_nav-label'
            navItemClassName='sidebar_nav-item'
          />
          <NavItemComponent
            route='istelle'
            iconClassName='sidebar_nav-icon istelle'
            labelClassName='sidebar_nav-label'
            navItemClassName='sidebar_nav-item'
          />
          <NavItemComponent
            route='invictus'
            iconClassName='sidebar_nav-icon invictus'
            labelClassName='sidebar_nav-label'
            navItemClassName='sidebar_nav-item'
          />
          <NavItemComponent
            route='sparks'
            iconClassName='sidebar_nav-icon sparks'
            labelClassName='sidebar_nav-label'
            navItemClassName='sidebar_nav-item'
          />
          <NavItemComponent
            route='phoenix'
            iconClassName='sidebar_nav-icon phoenix'
            labelClassName='sidebar_nav-label'
            navItemClassName='sidebar_nav-item'
          />
          <hr className='sidebar__separator--top' />
          {navItemHtml}
        </nav>
        <footer className='sidebar__footer'>
          <div className='sidebar_nav-item'>
            <span className='fa fa-cog' />
            <span className='sidebar_nav-label sidebar_nav-label--footer'> Settings </span>
          </div>
          <hr className='sidebar__separator--footer' />
          <p className='sidebar__footer__text'> Feedback </p>
          <p className='sidebar__footer__text'> Redemption guideline </p>
          <p className='sidebar__footer__text'> Suggestions </p>
        </footer>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  fetchUserRole: actions.fetchUserRoleRequest,
};

const mapStateToProps = ({ sidebar }) => ({
  userRole: sidebar.userRole,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarContainer);
