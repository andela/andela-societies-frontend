import React from 'react';
import PropTypes from 'prop-types';

const TestSaga = ({
  increment, decrement, incrementAsync, value,
}) => (
  <div>
    <h1 className='home__title'>Welcome to Andela Societies</h1>
    <div className='home__container'>
      <button type='button' onClick={increment}>
          Increment
      </button>
      {' '}
      <button type='button' onClick={decrement}>
          Decrement
      </button>
      {' '}
      <button type='button' onClick={incrementAsync}>
          Increment after 1 second
      </button>
      <hr />
      <div>
     Clicked:
        {' '}
        {value}
        {' '}
      times
      </div>
    </div>
  </div>
);

TestSaga.propTypes = {
  value: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
};

export default TestSaga;
