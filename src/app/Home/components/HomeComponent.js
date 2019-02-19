/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Modal from './onBoardingModal';
import LoginModal from './logInPointsModal';

import { loadCategories } from '../operations/actions';

// eslint-disable-next-line react/prefer-stateless-function
export class HomeComponent extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false,
      isShowingLoginPoints: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.props.loadCategories();
  }

closeModalHandler = () => {
  this.setState({
    isShowing: false,
  });
}

openModalLoginPointsHandler = () => {
  this.setState({
    isShowingLoginPoints: true,
  });
}

closeModalLoginPointsHandler = () => {
  this.setState({
    isShowingLoginPoints: false,
  });
}


render() {
  return (
    <div>
      { this.state.isShowing
        ? <div role='presentation' onClick={this.closeModalHandler} className='back-drop' /> : null }
      <h1 className='home__title'>Dashboard</h1>
      <button type='button' onClick={this.openModalLoginPointsHandler}>Log-in points</button>
      {
        !this.state.isShowingLoginPoints
          ? (
            <Modal
              className='modal'
              show={this.state.isShowing}
              close={this.closeModalHandler}
            />
          )
          : (
            <LoginModal
              className='modal'
              show={this.state.isShowingLoginPoints}
              close={this.loadCategories}
            />
          )
      }
    </div>
  );
}
}

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(loadCategories()),
});

export default connect(null, mapDispatchToProps)(HomeComponent);
