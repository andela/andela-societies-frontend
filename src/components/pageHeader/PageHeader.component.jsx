import React, { Component } from 'react';
import PropType from 'prop-types';

import './PageHeader.scss';

export default class PageHeader extends Component {
  state = {
    showFilterOptionsDropdown: false,
  };

  /**
   * Returns className from dropdown
   * @param {boolean} isActive Whether or not to show the dropdown
   * @param {array[string]} classList Other values for the className
   * @returns {string}
   */
  getDropdownClassName = (isActive, classList) => `${classList.join(' ')} ${isActive ? 'filterOptions__dropdown--active' : ''}`;

  /**
   * Creates event handler for when filter button is clicked
   * @returns {function} Toggles filter options dropdown
   */
  createFilterOptionsButtonClickHandler() {
    return () => {
      this.setState(prevState => ({
        showFilterOptionsDropdown: !prevState.showFilterOptionsDropdown,
      }));
    };
  }

  /**
   * Renders component
   * @returns {jsx}
   */
  render() {
    return (
      <header className="pageHeader">
        <h1 className="pageTitle">{this.props.title}</h1>
        <div className="filterOptions">
          <button
            className="filterOptions__button"
            onClick={this.createFilterOptionsButtonClickHandler()}
          >
            Pending
          </button>
          <div className={this.getDropdownClassName(this.state.showFilterOptionsDropdown, ['filterOptions__dropdown'])}>
            <div className="filterOptions__option">
              All
            </div>
            <div className="filterOptions__option">
              Approved
            </div>
            <div className="filterOptions__option">
              Expired
            </div>
            <div className="filterOptions__option">
              In review
            </div>
            <div className="filterOptions__option filterOptions__option--active">
              Pending
            </div>
          </div>
        </div>
      </header>
    );
  }
}

PageHeader.propTypes = {
  title: PropType.string.isRequired,
};
