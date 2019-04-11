import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import TextField from '@material-ui/core/TextField';
import StartIcon from '@material-ui/icons/Star';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { MenuItem, ButtonComponent } from '../../common/components';
import actions from '../operations/actions';
import validatePointsModal from '../../utils/validation';

/**
 * @summary Renders the Log society points Modal
 * @class LogPointsModal
 * @extends React.Component
 */
export class LogPointsModal extends Component {
  state = {
    categoryOption: '',
    numberOfParticipants: '0',
    description: '',
    activityDate: format(new Date(), 'MMM dd yyyy'),
    selectCategory: {
      value: 0,
      supportsMultipleParticipants: false,
    },
    errors: {},
  };

  static defaultProps = {
    categories: [],
    open: false,
    close: () => {},
    logActivity: () => {},
  }

  static propTypes = {
    open: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    close: PropTypes.func,
    logActivity: PropTypes.func,
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

  handleDateChange = (date) => {
    this.setState({ activityDate: date });
  };

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
      categoryOption, activityDate, numberOfParticipants, description, selectCategory,
    } = this.state;
    const data = {
      categoryOption, numberOfParticipants, description, activityDate, selectCategory,
    };
    const errors = validatePointsModal(data);
    if (Object.keys(errors) && Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    logActivity(
      {
        activityTypeId: categoryOption,
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
      errors,
    } = this.state;
    const {
      open, categories, close,
    } = this.props;
    const now = new Date();
    const today = format(now, 'MMM dd yyyy');
    const minDate = format(new Date(now.setDate(now.getDate() - 30)), 'MMM dd yyyy');
    const styles = {
      login: {
        transform: open ? 'translateY(0%)' : 'translateY(-100vh)',
        opacity: open ? '1' : '0',
      },
      textField: {
        display: selectCategory && selectCategory.supportsMultipleParticipants ? '' : 'none',
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
            {errors.categoryOption && <span className='validation-error'>{errors.categoryOption}</span>}
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
            {errors.numberOfParticipants && <span className='validation-error'>{errors.numberOfParticipants}</span>}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin='normal'
                fullWidth
                label='Date'
                value={activityDate}
                maxDate={today}
                minDate={minDate}
                onChange={this.handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <TextField
              required
              id='standard-description'
              label='Briefly what did you do'
              margin='normal'
              fullWidth
              value={description}
              onChange={this.handleChange('description')}
            />
            {errors.description && <span className='validation-error'>{errors.description}</span>}
            <div>
              <ButtonComponent type='button' className='btn-points'>
                {selectCategory ? selectCategory.value : 0}
                {' '}
                  Points
              </ButtonComponent>
            </div>
            <div className='log-points-footer'>
              <ButtonComponent
                id='submit'
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
