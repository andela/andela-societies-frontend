import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import StartIcon from '@material-ui/icons/Star';
import MenuItem from '@material-ui/core/MenuItem';
import { ButtonComponent } from '../../common/components';

import actions from '../operations/actions';

/**
   * @name LogActivityForm
   * @summary Returns Form
   * @returns Returns a form
   */
export class LogActivityForm extends Component {
  state = {
    categoryOption: [],
    numberOfParticipants: '',
    description: '',
    activityDate: '',
  };

  static defaultProps = {
    categories: [],
    show: false,
    logActivity: () => {},
    close: () => {},
  }

  static propTypes = {
    show: PropTypes.bool,
    logActivity: PropTypes.func,
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    close: PropTypes.func,
  };

  handleChange = prop => (event) => {
    this.setState({ [prop]: event.target.value });
  };


  handleSubmit = () => {
    const { logActivity, close } = this.props;
    const {
      categoryOption, activityDate, numberOfParticipants, description,
    } = this.state;
    logActivity(
      {
        activityId: categoryOption.id,
        date: activityDate,
        noOfParticipants: numberOfParticipants,
        description,
      },
    );
    close();
  }

  render() {
    const {
      categoryOption, numberOfParticipants, description, activityDate,
    } = this.state;
    const { show, categories, close } = this.props;
    return (
      <div className='login-jumbotron'>
        <section className='login-jumbotron'>
          <div
            className='login-container'
            style={{
              transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
              opacity: show ? '1' : '0',
            }}
          >
            <div className='log-points-ratings'>
              <StartIcon className='ratings-icon' />
              <StartIcon className='ratings-icon' />
              <StartIcon className='ratings-icon' />
            </div>
            <div className='log-points'>
              <h5 className='log-points__heading'>Log in points</h5>
            </div>
            <form className='form-container'>
              <TextField
                required
                value={categoryOption}
                select
                label='Category'
                margin='normal'
                fullWidth
                onChange={this.handleChange('categoryOption')}
              >
                {categories.map(option => (
                  <MenuItem key={option.id} value={option}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              {
                categoryOption.supportsMultipleParticipants === true
                  ? (
                    <TextField
                      required
                      id='filled-number'
                      name='numberOfParticipants'
                      label='Number'
                      value={numberOfParticipants}
                      onChange={this.handleChange('numberOfParticipants')}
                      type='number'
                      margin='normal'
                      fullWidth
                    />
                  )
                  : null
              }
              <TextField
                required
                id='date'
                label='Date'
                type='date'
                value={activityDate}
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={this.handleChange('activityDate')}
              />
              <TextField
                required
                id='standard-description'
                label='Briefly what did you do'
                margin='normal'
                fullWidth
                value={description}
                onChange={this.handleChange('description')}
              />
              <div>
                <ButtonComponent type='button' className='btn-points'>
                  {categoryOption.value}
                  {' '}
                  Points
                </ButtonComponent>
              </div>
              <div className='log-points-footer'>
                <ButtonComponent
                  type='button'
                  className='btn-log'
                  onClick={this.handleSubmit}
                >
                Log
                </ButtonComponent>
                <ButtonComponent type='button' className='btn-abort' onClick={close}>Cancel</ButtonComponent>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  categories: state.dashboard.categories,
});


export default connect(mapStateToProps, {
  logActivity: activity => actions.logPointsRequest(activity),
})(LogActivityForm);
