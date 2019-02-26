/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Modal from './onBoardingModal';
import LoginModal from './logInPointsModal';

import actions from '../operations/actions';

// eslint-disable-next-line react/prefer-stateless-function
export class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowing: false,
      isShowingLoginPoints: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.props.loadCategories();
    console.log('testrethjrykt', this.props);
  //   const { loadCategorie } = this.props;
  //   loadCategorie();
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
  console.log('render', this.props);
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
              // close={this.loadCategories}
            />
          )
      }
    </div>
  );
}
}

const mapStateToProps = state => ({
  test: state,
});

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(actions.loadCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
