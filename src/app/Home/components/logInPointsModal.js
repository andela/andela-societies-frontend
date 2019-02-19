import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import StartIcon from '@material-ui/icons/Star';
import EventIcon from '@material-ui/icons/Event';
import MenuItem from '@material-ui/core/MenuItem';

import { logPointsRequest } from '../operations/actions';


/**
   * @name LogActivityForm
   * @summary Returns Form
   * @returns Returns a form
   */
class LogActivityForm extends Component {
  static defaultProps = {
    categories: [],
  }

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    show: PropTypes.bool.isRequired,
    logActivity: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      categoryOption: [],
      numberOfParticipants: '',
      description: '',
      activityDate: '',
    };
  }

  /**
   * @name requiresNumberOf
   * @summary determine whether a category should have a number of input
   * @return {Boolean} whether a category should have a number of input
   */

  handleChange = prop => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const {
      categoryOption, numberOfParticipants, description, activityDate,
    } = this.state;
    const { show, categories, logActivity } = this.props;
    console.log('the categories', categoryOption.id);
    console.log('the number of part', numberOfParticipants);
    console.log('the desacription', description);
    console.log('the date', activityDate);
    console.log('the state', categories);
    return (
      <div>
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
              <h5>Log in points</h5>
            </div>
            <form className='form-container'>
              <TextField
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
                    <Fragment>
                      <TextField
                        id='filled-number'
                        name='numberOfParticipants'
                        label='Number'
                        value={numberOfParticipants}
                        onChange={this.handleChange('numberOfParticipants')}
                        type='number'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin='normal'
                        fullWidth
                      />
                    </Fragment>
                  )
                  : null
              }
              <TextField
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton>
                        <EventIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id='standard-description'
                label='Briefly what did you do'
                placeholder=''
                margin='normal'
                fullWidth
                value={description}
                onChange={this.handleChange('description')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div>
                <button type='button' className='btn-points'>
                  {categoryOption.value}
                  {' '}
                  Points
                </button>
              </div>
              <div className='log-points-footer'>
                <button
                  type='button'
                  className='btn-log'
                  onClick={() => {
                    logActivity(
                      {
                        activityId: categoryOption.id,
                        date: activityDate,
                        noOfParticipants: numberOfParticipants,
                        description,
                      },
                    );
                  }}
                >
                Log
                </button>
                <button type='button' className='btn-abort'>Cancel</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.home.categories,
});

const mapDispatchToProps = dispatch => ({
  logActivity: activity => dispatch(logPointsRequest(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogActivityForm);
