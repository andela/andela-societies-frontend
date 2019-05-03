import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions } from '../operations';
import LogoComponent from '../../common/components/LogoComponent';
import SidebarContainer from '../../Sidebar/components';
import ProfileContainer from '../../common/components/ProfileContainer';

export class NavbarContainer extends Component {
  static defaultProps = {
    userInfo: {
      name: '',
      picture: '',
    },
    search: null,
  };

  static propTypes = {
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }),
    search: PropTypes.func,
  };

  state = {
    sidebarState: false,
    searchText: '',
  };

  handleSearch = (evt) => {
    evt.preventDefault();
    const { searchText } = this.state;
    const { search } = this.props;
    if (!searchText) {
      search('');
    } else if (searchText.length % 2 === 0) {
      search(searchText);
    }
  };

  handleChange = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    const { search } = this.props;

    /*  eslint-disable react/destructuring-assignment */
    this.setState({ [name]: value }, () => {
      if (!this.state.searchText) {
        search('');
      } else if (this.state.searchText.length % 2 === 0) {
        search(this.state.searchText);
      }
    });
  };

  toggleSidebarState = () => {
    this.setState(prevState => ({ sidebarState: !prevState.sidebarState }));
  };

  render() {
    const {
      userInfo: { name, picture },
    } = this.props;
    const { sidebarState, searchText } = this.state;
    return (
      <nav className='navbar navbar-light'>
        <form className='form-inline' onSubmit={this.handleSearch}>
          <div className='input-group input-group-merge'>
            <input
              type='search'
              aria-label='Search'
              placeholder='Search ...'
              value={searchText}
              name='searchText'
              className='form-control form-control-search'
              onChange={this.handleChange}
            />
            <div className='input-group-append '>
              <span
                aria-hidden
                id='basic-addon1'
                onClick={this.handleSearch}
                className='input-group-text fa fa-search input-group-icon'
              />
            </div>
          </div>
        </form>
        <ProfileContainer className='desktop-profile' name={name} userImage={picture} />
        <SidebarContainer
          toggleSidebarState={this.toggleSidebarState}
          className={sidebarState ? 'mobile-sidenav open' : 'mobile-sidenav close'}
        />
        <div className='navbar__actions'>
          <i
            tabIndex={0}
            role='button'
            data-toggle='collapse'
            data-target='#menu-content'
            onClick={this.toggleSidebarState}
            onKeyPress={this.toggleSidebarState}
            className='fa fa-bars fa-2x toggle-btn'
          />
          <LogoComponent styles='navbar__logo' logoClassType='logo__image--white' />
          <ProfileContainer className='mobile-profile' name={name} userImage={picture} />
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  search: actions.search,
};

export default connect(
  null,
  mapDispatchToProps,
)(NavbarContainer);
