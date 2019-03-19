import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import StartIcon from '@material-ui/icons/Star';
// import { MenuItem } from '@material-ui/core';
import { MenuItem, ButtonComponent } from '../../common/components';
import actions from '../operations/actions';

/**
 * @summary Renders the Log society points Modal
 * @class LogPointsModal
 * @extends React.Component
 */
export class LogPointsModal extends Component {
  state = {
    categoryOption: '',
    numberOfParticipants: '',
    description: '',
    activityDate: '',
    selectCategory: {
      value: 0,
      supportsMultipleParticipants: false,
    },
  };

  static defaultProps = {
    categories: [],
    open: false,
    logActivity: () => {},
    close: () => {},
  }

  static propTypes = {
    open: PropTypes.bool,
    logActivity: PropTypes.func,
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    close: PropTypes.func,
  };

  componentDidUpdate(prevProps, prevState) {
    const { categoryOption } = this.state;
    const { categories } = this.props;
    const categoryItem = categories.find(category => category.id === categoryOption);
    this.setFormState(prevState, categoryItem, categoryOption);
  }

  setFormState = (prevState, categoryItem, categoryOption) => {
    if (categoryOption !== prevState.categoryOption) {
      this.setState({
        selectCategory: categoryItem,
      });
    }
  }

  /**
   * @name handleChange
   * @summary Maps the Society Activity inputs to the local state
   * @return {void}
   */
  handleChange = prop => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  /**
   * @name handleSubmit
   * @summary Handles submission of society activity points
   * @return {void}
   */
  handleSubmit = () => {
    const { logActivity, close } = this.props;
    const {
      categoryOption, activityDate, numberOfParticipants, description,
    } = this.state;
    logActivity(
      {
        activityId: categoryOption,
        date: activityDate,
        noOfParticipants: numberOfParticipants,
        description,
      },
    );
    close();
  }

  render() {
    const {
      categoryOption,
      numberOfParticipants,
      description,
      activityDate,
      selectCategory,
    } = this.state;
    const {
      open, categories, close,
    } = this.props;
    const styles = {
      login: {
        transform: open ? 'translateY(0%)' : 'translateY(-100vh)',
        opacity: open ? '1' : '0',
      },
      textField: {
        display: selectCategory.supportsMultipleParticipants ? '' : 'none',
      },
    };
    return (
      <div className='login-jumbotron'>
        <div
          className='login-container'
          style={styles.login}
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
            <MenuItem
              handleChange={this.handleChange('categoryOption')}
              categories={categories}
              categoryId={categoryOption}
            />
            <TextField
              id='filled-number'
              name='numberOfParticipants'
              label='Number'
              value={numberOfParticipants}
              onChange={this.handleChange('numberOfParticipants')}
              type='number'
              style={styles.textField}
              margin='normal'
              fullWidth
            />
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
                {selectCategory.value}
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
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  categories: state.dashboard.categories,
});


export default connect(mapStateToProps, {
  logActivity: activity => actions.logPointsRequest(activity),
})(LogPointsModal);
