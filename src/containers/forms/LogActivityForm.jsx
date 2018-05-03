import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleInput from '../../common/SingleInput';
import DateField from '../../common/DateField';
import Select from '../../common/Select';
import Buttons from '../../common/Buttons';
import TextArea from '../../common/TextArea';

/**
   * @name LogActivityForm
   * @summary Returns Form
   * @returns Returns a form
   */
class LogActivityForm extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @property {Array} categories - Array of activity categories
  */
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  /**
   * LogActivityForm component class constructor
   * @param {Object} props - actvity categories
   */
  constructor(props) {
    super(props);
    this.state = {
      selectValue: '',
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
  }

  /**
   * @memberOf LogActivityForm
   * change event handler
   * @param {Event} event - change event on select input
   */
  handleChange = (event) => {
    this.setState({ selectValue: event.target.value });
  }

  /**
   * @memberOf LogActivityForm
   * create an array of category names
   * @returns {Array} array of category names
   */
  createOptionValues = () => {
    const { categories } = this.props;
    const optionValues = [];
    categories.forEach((category) => {
      optionValues.push(category.name);
    });
    return optionValues;
  }

  render() {
    const { selectValue } = this.state;
    const { categories } = this.props;
    const optionValues = categories ? this.createOptionValues() : [];

    return (
      <form onSubmit={this.onSubmit}>
        <div className='titleForm'>Log an Activity</div>
        <DateField />
        <Select
          name='fellowActivities'
          placeholder='Select Category'
          options={optionValues}
          title='Activity Category'
          handleChange={this.handleChange}
        />
        {
          selectValue === 'Bootcamp Interviews' ?
            <SingleInput type='number' name='text' title='# of interviewees' /> : ''
        }

        <TextArea
          title='Description'
          rows={5}
          resize={false}
          name='Description'
          placeholder='keep it brief'
        />
        <div>
          <Buttons name='fellowButtonSubmit' value='Log' className='submitButton' />
          <Buttons name='fellowButtonCancel' value='Cancel' className='cancelButton' />
        </div>
      </form>
    );
  }
}

export default LogActivityForm;
