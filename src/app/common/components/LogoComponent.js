import React from 'react';
import PropTypes from 'prop-types';

const LogoComponent = ({ styles, logoClassType }) => (
  <div className={`logo ${styles}`}>
    <span className={`logo__image ${logoClassType}`} />
    <p className='logo__text'>Societies</p>
  </div>
);

LogoComponent.defaultProps = {
  styles: '',
  logoClassType: '',
};

LogoComponent.propTypes = {
  styles: PropTypes.string,
  logoClassType: PropTypes.string,
};

export default LogoComponent;
