/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const modal = props => (
  <div>
    <section className='jumbotron'>
      <div
        className='container'
        style={{
          transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        <div className='text-center modal-header'>
          <span className='checkmark'>
            <div className='checkmark_stem' />
            <div className='checkmark_kick' />
          </span>
          <h4 className='home__title'>What do you want to do</h4>
          <h3>Log-in points</h3>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='materialExampleRadios'
              id='materialchecked'
              value='option1'
            />
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='inlineRadioOptions'
              id='inlineRadio2'
              value='option2'
            />
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='inlineRadioOptions'
              id='inlineRadio3'
              value='option3'
            />
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn-cancel' onClick={props.close}>Not now</button>
          <button type='button' className='btn-continue'>Ok</button>
          <p className='modal-footer-text'>2018 &copy; Powered by Andela</p>
        </div>
      </div>
    </section>
  </div>
);

export default modal;
