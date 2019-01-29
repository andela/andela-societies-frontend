/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Modal from './onBoardingModal';

// eslint-disable-next-line react/prefer-stateless-function
export class HomeComponent extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false,
      shownTimes: 0,
    };
  }

  componentDidMount() {
    if (this.state.shownTimes === 0) {
      this.setState(
        // isShowing: true,
        prevState => ({
          isShowing: !prevState.true,
          shownTimes: prevState.shownTimes + 1,
        }),
      );
    }
    console.log(this.state.shownTimes);
    console.log(this.state.isShowing);
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
        showTime={this.state.shownTimes}
      />
    </div>
  );
}
}

export default (HomeComponent);
