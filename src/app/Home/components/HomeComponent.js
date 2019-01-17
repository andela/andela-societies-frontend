/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Modal from './onBoardingModal';

// eslint-disable-next-line react/prefer-stateless-function
export class HomeComponent extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false,
    };
  }

  componentDidMount() {
    this.setState({
      isShowing: true,
    });
  }

openModalHandler = () => {
  this.setState({
    isShowing: true,
  });
}

closeModalHandler = () => {
  this.setState({
    isShowing: false,
  });
}

render() {
  return (
    <div>
      { this.state.isShowing
        ? <div role='presentation' onClick={this.closeModalHandler} className='back-drop' /> : null }
      <h1 className='home__title'>Dashboard</h1>
      <Modal
        className='modal'
        show={this.state.isShowing}
        close={this.closeModalHandler}
      />
    </div>
  );
}
}

export default (HomeComponent);
