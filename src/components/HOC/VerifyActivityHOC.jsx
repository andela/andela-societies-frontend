import React, { Component } from 'react';
import SocietyButtons from '../header/SocietyButtons';

/* eslint-disable */
const VerifyActivity = (WrappedComponent) => {
  return class Verify extends Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    successPage = () => {
      return <div>
        <SocietyButtons />
      </div>
    }
    render() {
      console.log(...this.props)
      return <WrappedComponent {...this.props}  success={this.successPage} />;
    }
  };
};
export default VerifyActivity;
