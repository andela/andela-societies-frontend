import React, { Component } from 'react';
import { connect } from 'react-redux';

// third party libraries
import PropTypes from 'prop-types';

// components
import Button from '../../common/Button';
import TextArea from '../../common/TextArea';
import TextContent from '../../common/TextContent';
import FormError from '../../components/formErrors/FormError';
import SnackBar from '../../components/notifications/SnackBar';

// thunk
import { verifyRedemption } from '../../actions/verifyRedemptionActions';

// helpers
import validateFormFields from '../../helpers/validateForm';
import pointsToDollarConverter from '../../../src/helpers/pointsToDollarsConverter';

// fixtures
import { moreInfoText, rejectionText } from '../../fixtures/commentsFormText';

// constants
import clickActions from '../../constants/clickAction';

class CommentsForm extends Component {
  static defaultProps = {
    message: {},
    selectedItem: {},
    deselectItem: () => { },
    closeModal: () => { },
  };
  /**
   * @name propTypes
   */
  static propTypes = {
    verifyRedemption: PropTypes.func.isRequired,
    closeModal: PropTypes.func,
    message: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
    selectedItem: PropTypes.shape({ id: PropTypes.string }),
    deselectItem: PropTypes.func,
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.selectedItem.rejectClicked) {
      return {
        ...rejectionText,
      };
    }
    return state;
  }

  constructor(props) {
    super(props);
    this.state = {
      ...moreInfoText,
      comment: '',
      errors: [],
    };
  }

  /**
   * @name handleChange
   * @summary handles chnage event for form inputs
   * @param {Object} event
   */
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));

    if (!this.state[value]) {
      const errors = this.state.errors.filter(error => (error !== name));
      this.setState({ errors });
    }
  }

  /**
   * @name handleSubmit
   * @summary handles submit form event
   * @returns {void}
   */
  handleSubmit = () => {
    const { comment } = this.state;
    const { MORE_INFO, REJECT } = clickActions;
    const { selectedItem } = this.props;
    const errors = validateFormFields({ comment });
    const clickAction = selectedItem.rejectClicked ? REJECT : MORE_INFO;

    if (errors.length) {
      this.setState({ errors });
    } else {
      this.props.verifyRedemption(selectedItem.id, clickAction, comment);
      this.handleCloseModal();
    }
  }

  /**
   * @name resetState
   * @summary resets state to initial values
   */
  resetState = () => {
    this.setState({
      ...moreInfoText,
      comment: '',
      errors: [],
    });
  }

  /**
   * @name handleCloseModal
   * @summary handles the closing of the modal
   */
  handleCloseModal = () => {
    this.props.closeModal();
    if (this.props.selectedItem.id) {
      this.props.deselectItem();
    }
    this.resetState();
  }

  /**
   * @name renderItemDetails
   * @param {Object} selectedItem redemption/activity whose reject button has been clicked
   * @summary display details of selected item
   */
  renderItemDetails = (selectedItem) => {
    const {
      society,
      center,
      value,
      reason,
    } = selectedItem;
    const fields = {
      society: society.name,
      center: center.name,
      points: value.toString(),
      amount: `$${pointsToDollarConverter(value)}`,
      reason,
    };
    const displayNodes = Object.keys(fields).map(field =>
      <TextContent name={field} content={fields[field]} key={field} />);
    return displayNodes;
  }

  render() {
    const { message, selectedItem } = this.props;
    const {
      buttonText,
      comment,
      errors,
      placeholderText,
      title,
    } = this.state;

    return (
      <form>
        <div className='titleForm titleForm--comment'>{title}</div>
        {
          Object.keys(selectedItem).length && this.renderItemDetails(selectedItem)
        }
        <TextArea
          title='Comment'
          rows={5}
          resize={false}
          name='comment'
          value={comment}
          placeholder={placeholderText}
          handleChange={this.handleChange}
        />
        <FormError errors={errors} fieldName='comment' />
        <Button
          name='rejectionButtonSubmit'
          value={buttonText}
          className='submitButton'
          onClick={this.handleSubmit}
        />
        <Button
          name='rejectionButtonCancel'
          value='Cancel'
          className='cancelButton'
          onClick={this.handleCloseModal}
        />
        {
          message && <SnackBar message={message} />
        }
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  verifyRedemption: (redemption, clickAction, comment) =>
    (dispatch(verifyRedemption(redemption, clickAction, comment))),
});

export default connect(null, mapDispatchToProps)(CommentsForm);
