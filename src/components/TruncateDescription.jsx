import React, { Component } from 'react';

// third party libraries
import PropType from 'prop-types';

/**
 * @summary Renders description
 * @class TruncateDescription
 * @extends React.Component
 */
class TruncateDescription extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @param {String} description - The description to shorten
   */
  static propTypes = {
    description: PropType.string.isRequired,
    wordCount: PropType.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      longDescription: true,
    };
  }

  /**
   * @name truncateDescription
   * @summary Shortens the description passed as a param
   * @param {String} desc - description to be shortened
   * @param {Boolean} longDescription - boolean value indicate if description is long
   * @return {String} desc
   */
  truncateDescription = (desc, longDescription) => {
    const { wordCount } = this.props;
    if (desc.trim().length > wordCount && longDescription) {
      const shortDesc = desc.slice(0, wordCount + 1).concat('...');
      return shortDesc;
    }
    return desc;
  }

  /**
   * @name handleViewMoreLessClick
   * @summary Handles showing of more or less text
   * @return {void}
   */
  handleViewMoreLessClick = () => {
    const { longDescription } = this.state;
    this.setState({ longDescription: !longDescription });
  }

  render() {
    const { longDescription } = this.state;
    const { description, wordCount } = this.props;
    let buttonHtml = null;
    if (description.trim().length > wordCount) {
      buttonHtml = (
        <button className='activity__description__btn--more--less' onClick={this.handleViewMoreLessClick}>
          {longDescription ? 'More' : 'Less'}
        </button>
      );
    }
    return (
      <p className='activity__description'>
        {this.truncateDescription(description, longDescription)}
        {buttonHtml}
      </p>
    );
  }
}

export default TruncateDescription;
