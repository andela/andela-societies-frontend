import React, { Component } from 'react';
import SingleInput from '../../common/SingleInput';
import DateField from '../../common/DateField';
import Select from '../../common/Select';
import Buttons from '../../common/Buttons';
import TextArea from '../../common/TextArea';

class LogActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }
  render() {
    return (
      <form>
        <div>Log an Activity</div>
        <DateField />
        <Select
          name='fellowActivities'
          placeholder='Select Activities'
          options={this.state.activities}
          selectedOption={this.state.activities[0]}
          title='Activity'
        />
        <SingleInput type='text' name='text' title='Number of intervieews' />
        <TextArea title='Description' rows={5} resize={false}name='Description' placeholder='keep it brief' />
        <div>
          <Buttons name='fellowButtonSubmit' value='Log' className='submitButton' />
          <Buttons name='fellowButtonCancel' value='Cancel' className='cancelButton' />
        </div>
      </form>
    );
  }
}

export default LogActivityForm;
