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

class CommentsForm extends Component {
  static defaultProps = {
    message: {},
    selectedItem: {},
  };
  /**
   * @name propTypes
   */
  static propTypes = {
    verifyRedemption: PropTypes.func.isRequired,
    toggleOpenModal: PropTypes.func.isRequired,
    message: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
    selectedItem: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    this.state = {
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
    const {
      comment,
    } = this.state;
    const { selectedItem } = this.props;
    const errors = validateFormFields({ comment });

    if (errors.length) {
      this.setState({ errors });
    } else {
      this.props.verifyRedemption(selectedItem.id, false, comment);
      this.resetState();
      this.props.toggleOpenModal();
    }
  }

  /**
   * @name resetState
   * @summary resets state to initial values
   */
  resetState = () => {
    this.setState({
      comment: '',
      errors: [],
    });
  }

  /**
   * @name handleCloseModal
   * @summary handles the closing of the modal
   */
  handleCloseModal = () => {
    this.props.toggleOpenModal();
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
      pointsRedeemed,
      reason,
    } = selectedItem;
    const fields = {
      society: society.name,
      center,
      points: pointsRedeemed.toString(),
      amount: `$${pointsToDollarConverter(pointsRedeemed)}`,
      reason,
    };
    const displayNodes = Object.keys(fields).map(field =>
      <TextContent name={field} content={fields[field]} key={field} />);
    return displayNodes;
  }

  render() {
    const { message, selectedItem } = this.props;

    return (
      <form>
        <div className='titleForm titleForm--comment'>Comment on Rejection</div>
        {
          Object.keys(selectedItem).length && this.renderItemDetails(selectedItem)
        }
        <TextArea
          title='Comment'
          rows={5}
          resize={false}
          name='comment'
          value={this.state.comment}
          placeholder='Reason why this request has been rejected'
          handleChange={this.handleChange}
        />
        <FormError errors={this.state.errors} fieldName='comment' />
        <Button
          name='rejectionButtonSubmit'
          value='Reject'
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
  verifyRedemption: (redemption, isApproved, comment) => (dispatch(verifyRedemption(redemption, isApproved, comment))),
});

export default connect(null, mapDispatchToProps)(CommentsForm);
