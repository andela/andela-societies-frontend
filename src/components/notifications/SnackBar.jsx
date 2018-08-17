import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../svgIcons/notificationIcons/Close';
import ErrorIcon from '../svgIcons/notificationIcons/Error';

// Constants
import { SNACKBARTIMEOUT_SUCCESS } from '../../constants/snackbarTimeout';

class SnackBar extends Component {
  /**
    * @name SnackBar
    * @type {propTypes}
    * @param {Object} props - React PropTypes
    * @property {boolean} show - whether to display/hide message
    * @property {Object} message - object with type and text to be displayed
    * @return React node containing component for displaying a snackbar notification
    */
  static propTypes = {
    show: PropTypes.bool,
    message: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    show: true,
  }

  /**
   * @name getDerivedStateFromProps
   * @summary react lifecycle method to update state with message and whether to display the message
   * @return {Object} state
   */
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.message.text !== prevState.message.text) {
      return {
        message: nextProps.message,
        show: true,
      };
    }
    return prevState;
  };

  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      show: props.show,
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ show: false });
  }

  /**
   * @name showClass
   * @summary applies css styling to displayed message
   * @return {String} css classes
   */
  showClass = () => {
    const { message } = this.state;
    if (message.type === 'success') {
      setTimeout(() => { this.setState({ show: false }); }, SNACKBARTIMEOUT_SUCCESS);
    }

    return message ? `snackbar snackbar--show ${message.type}` : '';
  };

  render() {
    const { message, show } = this.state;
    return show ? (
      <div className={this.showClass()}>
        {
          message.type === 'error' && <span className='snackbar__error'><ErrorIcon /></span>
        }
        <div className='snackbar__text'>{message.text}</div>
        {
          message.type === 'error' &&
            <button className='snackbar__button' onClick={this.handleClick}>
              <CloseIcon />
            </button>
        }
      </div>
    ) : null;
  }
}

export default SnackBar;
