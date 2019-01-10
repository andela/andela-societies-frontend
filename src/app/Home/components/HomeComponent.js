/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import TestSaga from './testSaga';

export class HomeComponent extends Component {
  onIncrement = () => {
    this.props.dispatch({
      type: 'INCREMENT',
    });
  }

  onDecrement = () => {
    this.props.dispatch({
      type: 'DECREMENT',
    });
  }

  onIncrementAsync = () => {
    this.props.dispatch({
      type: 'INCREMENT_ASYNC',
    });
  }

  render() {
    return (
      <TestSaga
        increment={this.onIncrement}
        decrement={this.onDecrement}
        incrementAsync={this.onIncrementAsync}
        value={this.props.value}
      />
    );
  }
}

HomeComponent.propTypes = {
  value: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    value: state.home,
  };
}

export default connect(mapStateToProps)(HomeComponent);
