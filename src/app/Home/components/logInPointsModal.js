/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import StartIcon from '@material-ui/icons/Star';
import EventIcon from '@material-ui/icons/Event';

const modal = props => (
  <div>
    <section className='login-jumbotron'>
      <div
        className='login-container'
        style={{
          transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
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
            className='log-points-inputs'
            id='standard-select-category'
            select
            label='Category'
            margin='normal'
            fullWidth
          />
          <TextField
            className='log-points-inputs'
            id='date'
            label='Date'
            type='date'
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
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
            className='log-points-inputs'
            id='standard-description'
            label='Briefly what did you do'
            margin='normal'
            fullWidth
          />

          <div>
            <button type='button' className='btn-points'>100 Points</button>
          </div>
          <div className='log-points-footer'>
            <button type='submit' className='btn-log'>Log</button>
            <button type='button' className='btn-abort' onClick={props.close}>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  </div>
);

export default modal;
