import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import StartIcon from '@material-ui/icons/Star';
import MenuItem from '@material-ui/core/MenuItem';

import actions from '../operations/actions';

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
    show: PropTypes.bool.isRequired,
    logActivity: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    close: PropTypes.func.isRequired,
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
              <h5>Log in points</h5>
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
                    <Fragment>
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
                    </Fragment>
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
                  onClick={this.handleSubmit}
                >
                Log
                </button>
                <button type='button' className='btn-abort' onClick={close}>Cancel</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.dashboard.categories,
});

const mapDispatchToProps = dispatch => ({
  logActivity: activity => dispatch(actions.logPointsRequest(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogActivityForm);
