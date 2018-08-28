import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import SnackBar from '../../components/notifications/SnackBar';
import SingleInput from '../../common/SingleInput';
import DateField from '../../common/DateField';
import Select from '../../common/Select';
import Button from '../../common/Button';
import TextArea from '../../common/TextArea';

// actions
import { createActivity } from '../../actions/activityActions';
import { updateActivity } from '../../actions/myActivitiesActions';

// helpers
import validateFormFields from '../../helpers/validate';
import labels from '../../fixtures/labels';

// constants
import SNACKBARTIMEOUT from '../../constants/snackbarTimeout';

/**
   * @name LogActivityForm
   * @summary Returns Form
   * @returns Returns a form
   */
class LogActivityForm extends Component {
  static defaultProps = {
    selectedItem: {},
    updateSelectedItem: () => { },
    message: {
      type: '',
      text: '',
    },
  }
  /**
   * @name propTypes
   * @type {PropType}
   * @property {Array} categories - Array of activity categories
  */
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    closeModal: PropTypes.func.isRequired,
    createActivity: PropTypes.func.isRequired,
    updateActivity: PropTypes.func.isRequired,
    selectedItem: PropTypes.shape({ id: PropTypes.string }),
    updateSelectedItem: PropTypes.func,
    message: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string,
    }),
  };

  static getDerivedStateFromProps = (nextProps, state) => {
    const { selectedItem } = nextProps;
    if (selectedItem.id) {
      const {
        description,
        category,
        activityDate,
        numberOf,
        activityTypeId,
      } = selectedItem;

      const formTitle = 'Edit Activity Request Form';
      const btnText = 'Update';
      return {
        activityDate,
        description,
        category,
        numberOf,
        formTitle,
        btnText,
        activityTypeId,
        errors: {},
      };
    }
    return state;
  };

  /**
   * LogActivityForm component class constructor
   * @param {Object} props - actvity categories
   */
  constructor(props) {
    super(props);
    this.state = {
      activityTypeId: '',
      numberOf: '',
      activityDate: '',
      description: '',
      errors: {},
      formTitle: 'Log An Activity',
      btnText: 'Log',
    };
  }

  /**
   * @name componentDidUpdate
   * @summary Lifecycle method that is called when props changes
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    const { message } = prevProps;
    if (message) {
      if (prevProps.message.type !== this.props.message.type && this.props.message.type === 'success') {
        setTimeout(() => {
          this.cancelModal();
        }, SNACKBARTIMEOUT);
      }
    }
  }

  /**
   * @name setLabel
   * @summary gets the appropriate label from the labels object
   * @return {String} label
   */
  setLabel = () => {
    const categoryName = this.selectedCategory().name.toLowerCase();
    return Object.keys(labels).find(label => labels[label].includes(categoryName));
  }

  /**
   * @memberOf LogActivityForm
   * change event handler
   * @param {Event} event - change event on select input
   */
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    const errors = { ...this.state.errors };
    if (event.target.value) delete errors[event.target.name];
    this.setState({ errors });
  }

  handleAddEvent = () => {
    const {
      activityTypeId,
      activityDate,
      description,
      numberOf,
    } = this.state;
    const activity = {
      activityTypeId,
      date: activityDate,
      description,
    };
    const { selectedItem } = this.props;
    if (this.requiresNumberOf()) {
      activity.numberOf = numberOf;
    }
    this.setState({
      errors: validateFormFields(activity),
    }, () => {
      if (Object.keys(this.state.errors).length === 0) {
        if (selectedItem.id) {
          this.props.updateSelectedItem(this.state);
          this.props.updateActivity({
            id: selectedItem.id,
            date: activityDate,
            description,
            activityTypeId,
            numberOf,
          });
        } else {
          this.props.createActivity(activity);
        }
      }
    });
  }

  /**
   * @name resetState
   * @summary resets state to clear form fields and error messages
   */
  resetState = () => {
    this.setState({
      activityTypeId: '',
      numberOf: '',
      activityDate: '',
      description: '',
      errors: {},
      formTitle: 'Log An Activity',
      btnText: 'Log',
    });
  }

  /**
   * @name cancelModal
   * @summary reset state and close modal
   */
  cancelModal = () => {
    this.props.closeModal();
    this.resetState();
  }

  /**
   * @name selectedCategory
   * @summary uses activityTypeId to find the selected category
   * @return {Object} category
   */
  selectedCategory = () => this.props.categories.filter(category => category.id === this.state.activityTypeId)[0];

  /**
   * @name requiresNumberOf
   * @summary determine whether a category should have a number of input
   * @return {Boolean} whether a category should have a number of input
   */
  requiresNumberOf = () => {
    const { activityTypeId } = this.state;
    return activityTypeId && this.selectedCategory().supportsMultipleParticipants;
  }

  renderValidationError = (field) => {
    if (typeof this.state.errors[field] !== 'undefined') {
      return this.state.errors[field];
    }
    return '';
  }

  render() {
    const { activityTypeId, numberOf } = this.state;
    const { categories, message } = this.props;
    const { formTitle, btnText, activityDate } = this.state;
    return (
      <form>
        <div className='titleForm'>{formTitle}</div>
        <DateField
          handleChange={this.handleChange}
          value={activityDate}
        />
        <span className='validate__errors'>
          {this.renderValidationError('date')}
        </span>
        <Select
          name='activityTypeId'
          placeholder='Select Category'
          options={categories}
          title='Activity Category'
          value={activityTypeId}
          handleChange={this.handleChange}
        />
        <span className='validate__errors'>
          {this.renderValidationError('activityTypeId', 'Category')}
        </span>
        {
          this.requiresNumberOf() ?
            <Fragment>
              <SingleInput
                type='number'
                name='numberOf'
                title={`# of ${this.setLabel()}`}
                value={numberOf}
                handleChange={this.handleChange}
              />
              <span className='validate__errors'>
                {this.renderValidationError('numberOf', `Number of ${this.setLabel()}`)}
              </span>
            </Fragment>
            : null
        }

        <TextArea
          title='Description'
          rows={5}
          resize={false}
          name='description'
          placeholder='keep it brief'
          handleChange={this.handleChange}
          value={this.state.description}
        />
        <span className='validate__errors'>
          {this.renderValidationError('description')}
        </span>
        <div>
          <Button
            name='fellowButtonSubmit'
            value={btnText}
            className={`submitButton ${message && message.type === 'info' ? 'submitButton--disabled' : ''}`}
            onClick={this.handleAddEvent}
          />
          <Button
            name='fellowButtonCancel'
            value='Cancel'
            className='cancelButton'
            onClick={this.cancelModal}
          />
        </div>
        {
          message && <SnackBar message={message} />
        }
      </form>
    );
  }
}

const mapStateToProps = state => ({
  message: state.myActivities.message,
});

export default connect(mapStateToProps, {
  createActivity,
  updateActivity,
})(LogActivityForm);
