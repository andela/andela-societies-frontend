import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ show, close }) => (
  <div className='jumbotron'>
    <div
      className='container'
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      <div className='header'>
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
      <div className='footer'>
        <button type='button' className='btn-cancel' onClick={close}>Not now</button>
        <button type='button' className='btn-continue'>Ok</button>
        <p className='modal-footer-text'>2018 &copy; Powered by Andela</p>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  show: false,
};

export default Modal;
