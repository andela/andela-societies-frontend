import React, { Component } from 'react';
import SocietyButtons from '../header/SocietyButtons';

/* eslint-disable */
const VerifyActivity = (WrappedComponent) => {
  return class Verify extends Component {
    successPage = () => {
      return <div>
        <SocietyButtons />
      </div>
    }
    render() {
      return <WrappedComponent {...this.props}  success={this.successPage} />;
    }
  };
};
export default VerifyActivity;
