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
  }

  /**
   * @name getDerivedStateFromProps
   * @summary Lifecyle method that keeps description state in sync with props
   * @param {Object} props
   * @param {Object} state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.description !== state.description) {
      return {
        description: props.description,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      showMoreLess: false,
      toggleBtnText: true,
    };
  }

  componentDidMount() {
    this.truncateDescription();
  }

  /**
   * @name componentDidUpdate
   * @summary Lifecycle method that is called when prop of description changes
   * @param {Object} prevProps
   * @param {Object} prevState
   */
  componentDidUpdate(prevProps) {
    if (this.props.description !== prevProps.description) {
      this.truncateDescription();
    }
  }

  /**
   * @name truncateDescription
   * @summary Shortens the description passed as props
   * @return {void}
   */
  truncateDescription = () => {
    let longDescription = this.state.description;
    longDescription = longDescription.trim();
    let descArray = longDescription.split('');
    if (descArray.length > 50) {
      descArray = longDescription.split('', 50);
      descArray = [...descArray, '...'];
      return this.setState({ showMoreLess: true, description: descArray.join('') });
    }
    return null;
  }

  /**
   * @name handleViewMoreLessClick
   * @summary Handles showing of more or less text
   * @return {void}
   */
  handleViewMoreLessClick = () => {
    const { toggleBtnText } = this.state;
    // console.log('here', this.state.description);
    if (!toggleBtnText) {
      this.truncateDescription();
      this.setState({ toggleBtnText: !this.state.toggleBtnText });
    } else {
      this.setState({ description: this.props.description, toggleBtnText: !this.state.toggleBtnText });
    }
  }

  render() {
    const { description, showMoreLess, toggleBtnText } = this.state;
    let showMoreLessHtml = null;

    if (showMoreLess) {
      showMoreLessHtml = (
        <button className='activity__description__btn--more--less' onClick={this.handleViewMoreLessClick}>
          {toggleBtnText ? 'More' : 'Less'}
        </button>
      );
    }
    return (
      <p className='activity__description'>
        {description}
        {showMoreLessHtml}
      </p>
    );
  }
}

export default TruncateDescription;
