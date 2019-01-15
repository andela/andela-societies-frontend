/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import TestSaga from './testSaga';

// eslint-disable-next-line react/prefer-stateless-function
export class HomeComponent extends Component {
  render() {
    return (
      <TestSaga />
    );
  }
}

export default (HomeComponent);
