import React, { Component } from 'react';
import Modal from './onBoardingModal';

export class HomeComponent extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false,
      shownOnce: !!localStorage.getItem('shownonce'),
    };
  }

  componentDidMount() {
    const { shownOnce } = this.state;
    if (!shownOnce) {
      this.setState({
        isShowing: true,
        shownOnce: true,
      }, () => {
        localStorage.setItem('shownonce', true);
      });
    }
  }

closeModalHandler = () => {
  this.setState({
    isShowing: false,
  });
}

render() {
  const { isShowing } = this.state;
  return (
    <div>
      { isShowing
        ? <div role='presentation' onClick={this.closeModalHandler} className='back-drop' /> : null }
      <h1 className='home__title'>Dashboard</h1>
      <Modal
        className='modal'
        show={isShowing}
        close={this.closeModalHandler}
      />
    </div>
  );
}
}


export default (HomeComponent);
