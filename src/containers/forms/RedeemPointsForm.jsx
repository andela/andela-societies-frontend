import React, { Component } from 'react';
import { connect } from 'react-redux';

// third party libraries
import PropTypes from 'prop-types';

// components
import Button from '../../common/Button';
import Select from '../../common/Select';
import SingleInput from '../../common/SingleInput';
import TextArea from '../../common/TextArea';
import FormError from '../../components/formErrors/FormError';
import SnackBar from '../../components/notifications/SnackBar';

// thunk
import { redeemPoints, updateRedemption } from '../../actions/redeemPointsAction';

// helpers
import validateFormFields from '../../helpers/validateForm';
import pointsToDollarConverter from '../../helpers/pointsToDollarsConverter';

// fixtures
import centers from '../../fixtures/centers';

class RedeemPointsForm extends Component {
  static defaultProps = {
    message: {},
    selectedItem: {},
    deselectItem: () => { },
    updateSelectedItem: () => { },
  };
  /**
   * @name propTypes
   */
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    redeemPoints: PropTypes.func.isRequired,
    updateRedemption: PropTypes.func.isRequired,
    message: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
    selectedItem: PropTypes.shape({ id: PropTypes.string }),
    deselectItem: PropTypes.func,
    updateSelectedItem: PropTypes.func,
  }

  static getDerivedStateFromProps = (props, state) => {
    const { selectedItem } = props;
    if (selectedItem.id) {
      const center = selectedItem.center.name;
      const points = selectedItem.value.toString();
      const reason = selectedItem.name;
      const dollars = pointsToDollarConverter(selectedItem.value).toString();
      const formTitle = 'Edit Redemption Request Form';
      const btnText = 'Edit';
      return {
        center,
        points,
        reason,
        dollars,
        formTitle,
        btnText,
      };
    }
    return state;
  }

  constructor(props) {
    super(props);
    this.state = {
      center: '',
      points: '',
      reason: '',
      dollars: '0.00',
      errors: [],
      formTitle: 'Redeem Points',
      btnText: 'Redeem',
    };
  }

  /**
   * @name componentDidUpdate
   * @summary Lifecycle method that is called when props changes
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    const { type } = this.props.message;
    if (type !== prevProps.message.type) {
      if (type === 'success') {
        setTimeout(() => { this.handleCloseModal(); }, 2000);
      }
    }
  }

  /**
   * @name handleChange
   * @summary handles chnage event for form inputs
   * @param {Object} event
   */
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
    // check if field name is points and call the converter
    if (name === 'points') {
      this.setState(() => ({ dollars: pointsToDollarConverter(value) }));
    }
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
      center,
      points,
      reason,
    } = this.state;
    const { selectedItem } = this.props;

    // check if the fields have errors. Dispatch an action if there are no errors
    this.setState({
      errors: validateFormFields({ center, points, reason }),
    }, () => {
      if (this.state.errors.length === 0) {
        if (selectedItem.id) {
          this.props.updateSelectedItem(this.state);
          this.props.updateRedemption({
            id: selectedItem.id,
            center,
            points,
            reason,
          });
        } else {
          this.props.redeemPoints({
            center,
            points,
            reason,
          });
        }
      }
    });
  }

  /**
   * @name resetState
   * @summary resets state to initial values
   */
  resetState = () => {
    this.setState({
      center: '',
      points: '',
      reason: '',
      dollars: '0.00',
      errors: [],
      formTitle: 'Redeem Points',
      btnText: 'Redeem',
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

  render() {
    const { message } = this.props;
    const { formTitle, btnText } = this.state;
    return (
      <form>
        <h3>{formTitle}</h3>
        <Select
          name='center'
          placeholder='Select center'
          options={centers}
          title='Center'
          value={this.state.center}
          handleChange={this.handleChange}
        />
        <FormError errors={this.state.errors} fieldName='center' />
        <SingleInput
          name='points'
          type='number'
          title='Points'
          value={this.state.points}
          additionalClass='formField__currency'
          dollars={this.state.dollars}
          handleChange={this.handleChange}
        />
        <FormError errors={this.state.errors} fieldName='points' />
        <TextArea
          title='Reason'
          rows={5}
          resize={false}
          name='reason'
          value={this.state.reason}
          placeholder='reason for redemption'
          handleChange={this.handleChange}
        />
        <FormError errors={this.state.errors} fieldName='reason' />
        <Button
          name='redeemButtonSubmit'
          value={btnText}
          className='submitButton'
          onClick={this.handleSubmit}
        />
        <Button
          name='redeemButtonCancel'
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

const mapStateToProps = state => ({
  message: state.redeemPointsInfo.message,
  societyId: state.userProfile.info.society.id,
});


const mapDispatchToProps = dispatch => ({
  redeemPoints: redemption => dispatch(redeemPoints(redemption)),
  updateRedemption: redemption => dispatch(updateRedemption(redemption)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RedeemPointsForm);
